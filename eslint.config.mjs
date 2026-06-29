// ESLint flat config — install @eslint/js + typescript-eslint + globals to enable rules.
// For now, only ignores are configured.
export default [
  {
    ignores: ['node_modules/', 'dist/', 'dist-server/', '.turbo/', 'coverage/'],
  },
];
