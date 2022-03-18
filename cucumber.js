const common = [
    'spec/cucumber/features/**/*.feature', // Specify feature files
    '--require-module ts-node/register', // Load TypeScript module
    '--require spec/cucumber/steps/**/*.ts', // Load step definitions
    '--publish-quiet',
    '--format summary',
    '--format progress',
    '--format json:cucumber_report.json',
    `--tags ${process.env.TAGS || '@ci'}`,
].join(' ');

module.exports = {
    default: common,
};
