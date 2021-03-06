module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'arrow-body-style': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/no-array-index-key': 'off',
  },
};
