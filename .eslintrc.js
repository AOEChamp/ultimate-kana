module.exports = {
  extends: ['airbnb', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  plugins: ['react'],
  rules: {
    'no-plusplus': 'off',
    'no-use-before-define': ['error', { variables: false }],
    'react/prop-types': 0,
    'jsx-a11y/href-no-hash': ['off'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'max-len': [
      'warn',
      {
        code: 100,
        tabWidth: 2,
        comments: 100,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
  globals: {
    __DEV__: true,
  },
};
