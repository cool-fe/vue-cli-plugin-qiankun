module.exports = {
  root: true,
  extends: ['@winfe/eslint-config-winex/eslintrc.typescript-vue.js', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.vue', '.jsx', '.json']
      }
    }
  },
  rules: {
    'import/extensions': 'off'
  }
};
