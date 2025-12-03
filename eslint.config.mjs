// Use explicit .js subpaths so Node ESM resolver can locate the files
import { defineConfig, globalIgnores } from 'eslint/config';

// Flat config: use globalIgnores to prevent ESLint from processing any files.
export default defineConfig([
  globalIgnores([
    // Ignore everything to effectively disable ESLint reporting during development
    '**/*',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

// rules: {
//     '@typescript-eslint/no-explicit-any': 'off', // ✅ Disable the rule
//     'react-hooks/rules-of-hooks': 'off', // optional
//     // You can disable more if needed:
//     // "@typescript-eslint/ban-ts-comment": "off",
//     // "@typescript-eslint/no-unused-vars": "off",
//   },
