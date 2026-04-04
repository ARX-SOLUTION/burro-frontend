import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z
    .string({ error: 'VITE_API_BASE_URL is required' })
    .url('VITE_API_BASE_URL must be a valid URL')
    .default('http://localhost:4000/api'),
  MODE: z.enum(['development', 'production', 'test']).default('development'),
  DEV: z.boolean().default(true),
  PROD: z.boolean().default(false),
});

export type EnvType = z.infer<typeof envSchema>;

function parseEnv(): EnvType {
  const result = envSchema.safeParse({
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    MODE: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
  });

  if (!result.success) {
    const errors = result.error.issues.map(
      (issue) => `  - ${issue.path.join('.')}: ${issue.message}`,
    );
    console.error('\n🚨 Environment validation failed:\n\n' + errors.join('\n') + '\n');
    throw new Error(`Invalid environment variables:\n${errors.join('\n')}`);
  }

  return result.data;
}

export const env = parseEnv();
export const isDev = env.DEV;
export const isProd = env.PROD;
