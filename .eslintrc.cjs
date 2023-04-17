module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'error',
    "quotes": [2, 'single', { 'avoidEscape': true }]
  },
  ignorePatterns: [
    'build/',
    'public/',
    'src/serviceWorkerRegistration.ts',
    'src/service-worker.ts',
    'src/reportWebVitals.ts',
    'src/react-app-env.d.ts'
  ],
  root: true,
};
