module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/standard"
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "indent": "off",
    "vue/script-indent": ["error", 2, {
      baseIndent: 1,
      switchCase: 1
    }],
    "quotes": ["error", "double"],
    "quote-props": ["error", "consistent"]
  }
}
