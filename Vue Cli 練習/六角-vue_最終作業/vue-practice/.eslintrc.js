module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 下兩個是 -> form label must have an associated control -> 解決方法
    'vuejs-accessibility/label-has-for': 'off',
    'jsx-ally/label-has-associated-control': 'off',
    // Component name " **** " should always be multi-word -> 解決方法
    'vue/multi-word-component-names':'off',
  },
};
