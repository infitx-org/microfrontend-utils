module.exports = {
  'src/**/*.{js,ts,md,json}': [
    './node_modules/.bin/eslint --fix',
    './node_modules/.bin/prettier --write',
    'yarn lint',
  ],
};
