const {defaults} = require('jest-config');
module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        }
    },
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    transform: {
        // "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    transformIgnorePatterns: [
        `[/\\\\]node_modules[/\\\\](?!${[
            '@universal-health-chain/uhc-common-utils-typescript'
        ].join('|')})`,
    ],
    testMatch: [
        "**/test/**/*.test.(ts|js)"
    ],
    testEnvironment: "node"
};
