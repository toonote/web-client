module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended'],
  plugins: ['@typescript-eslint', 'jest'],
  env: {
    'jest/globals': true,
  },
  rules: {
    '@typescript-eslint/no-empty-interface': 'off',
    'vue/html-indent': ['warn', 2],
    'vue/html-self-closing': ['warn', {
      html: {
        void: 'always',
      },
    }],
    'vue/max-attributes-per-line': ['warn', {
      singleLine: 5,
    }],
  }
};
