import { z } from 'zod';

import { COMMENT_CONTENT_MAX_LENGTH, COMMENT_CONTENT_MIN_LENGTH } from '#/utils/constants';

export const commentSchema = z.object({
    content: z
        .string()
        .trim()
        .min(
            COMMENT_CONTENT_MIN_LENGTH,
            `Comment should be at least ${COMMENT_CONTENT_MIN_LENGTH} characters`,
        )
        .max(
            COMMENT_CONTENT_MAX_LENGTH,
            `Comment should be at most ${COMMENT_CONTENT_MAX_LENGTH} characters`,
        ),
});

export type CommentFormValues = z.infer<typeof commentSchema>;
