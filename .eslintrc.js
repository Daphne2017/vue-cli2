// https://eslint.org/docs/user-guide/configuring
// https://blog.csdn.net/weixin_38606332/article/details/80864381   Vue中ESlint配置文件eslintrc.js文件详解
// https://www.cnblogs.com/ye-hcj/p/7069505.html   Vue中ESlint配置文件eslintrc.js文件详解
// https://www.jianshu.com/p/59ffcc91ad15   Vue中ESlint配置文件eslintrc.js文件详解
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
