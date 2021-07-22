module.exports = {
  "**/*.{js,vue,ts}": [
    "prettier   -c  --write  --config ./.prettierrc.js",
    "eslint  --config  ./.eslintrc.js --fix"
  ]
}