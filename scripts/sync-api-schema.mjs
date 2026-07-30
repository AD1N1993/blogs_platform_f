/**
 * Rebuilds src/types/generated/openapi.json from the backend's *.swagger.yml files.
 *
 * The backend assembles its spec at runtime with swagger-jsdoc and serves it from /api,
 * so there is no committed JSON to fetch — we run the same assembly step here against a
 * local checkout. Point BACKEND_PATH at that checkout; run `yarn api:types` afterwards
 * to regenerate api.ts.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const backendPath = process.env.BACKEND_PATH ?? resolve(projectRoot, '../shcool/blog_platform_b');
const outputPath = resolve(projectRoot, 'src/types/generated/openapi.json');

// swagger-jsdoc resolves the `apis` globs relative to cwd, so the build has to run
// inside the backend checkout with the backend's own copy of the package.
const buildScript = `
const swaggerJsdoc = require('swagger-jsdoc');
process.stdout.write(JSON.stringify(swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: { title: 'Blog Platform API', version: '1.0.0' },
    },
    apis: ['./src/**/*.swagger.yml'],
}), null, 2));
`;

let spec;

try {
    spec = execFileSync(process.execPath, ['-e', buildScript], {
        cwd: backendPath,
        encoding: 'utf8',
        maxBuffer: 32 * 1024 * 1024,
    });
} catch (error) {
    console.error(`Failed to build the spec from ${backendPath}`);
    console.error('Set BACKEND_PATH if the backend lives elsewhere.');
    console.error(error.message);
    process.exit(1);
}

const parsed = JSON.parse(spec);
const paths = Object.keys(parsed.paths ?? {});
const schemas = Object.keys(parsed.components?.schemas ?? {});

if (paths.length === 0 || schemas.length === 0) {
    console.error('The assembled spec has no paths or schemas — refusing to overwrite.');
    process.exit(1);
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${spec}\n`);

console.log(`Wrote ${outputPath}`);
console.log(`  paths:   ${paths.length} (${paths.join(', ')})`);
console.log(`  schemas: ${schemas.length}`);
