module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 解決 Expected linebreaks to be 'LF' but found 'CRLF' 錯誤
    'linebreak-style': ['off', 'windows'],
    // 解決 Form label must have an associated control 錯誤，後續練習時，加上後還是報錯，但一次重整後就沒影響了，或許得全部重開才能正確執行規則
    'vuejs-accessibility/label-has-for': 'off',
    'jsx-ally/label-has-associated-control': 'off',
    // Component name " **** " should always be multi-word 錯誤，駝峰命名
    'vue/multi-word-component-names': 'off',
  },
};
