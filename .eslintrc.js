module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-empty-interface': 'off',
    'vue/html-indent': ['warn', 2],
  }
};
