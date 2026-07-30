import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const srcPath = (segment = '') => fileURLToPath(new URL(`./src/${segment}`, import.meta.url));

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: /^#slices\/(.*)/, replacement: `${srcPath('store/slices')}/$1` },
            { find: '#selectors', replacement: srcPath('store/selectors/index.ts') },
            { find: /^#services\/(.*)/, replacement: `${srcPath('services')}/$1` },
            { find: /^#\/(.*)/, replacement: `${srcPath()}$1` },
        ],
    },
    css: {
        modules: {
            localsConvention: 'camelCaseOnly',
            generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
    },
    server: {
        port: 8080,
        proxy: {
            // The backend exposes /blogs and /posts at its root and keeps /api for Swagger UI,
            // so the prefix is stripped before forwarding
            '/backend-api': {
                target: process.env.VITE_API_TARGET ?? 'http://localhost:5001',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/backend-api/, ''),
            },
        },
    },
    build: {
        outDir: 'build',
        sourcemap: true,
        rollupOptions: {
            output: {
                // Without this, the shared chunk inherits the name of whichever module
                // happened to pull it in first, which reads as unrelated to its contents
                chunkFileNames: (chunk) =>
                    chunk.name.includes('-page')
                        ? 'assets/[name]-[hash].js'
                        : 'assets/shared-[hash].js',
            },
        },
    },
});
