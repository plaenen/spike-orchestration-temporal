module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'always'],
    'scope-enum': [2, 'always', ['canary']],
    'header-max-length': [2, 'always', 120],
    'body-max-line-length': [1, 'always', 100],
    'footer-max-line-length': [2, 'always', 120]
  }
};
