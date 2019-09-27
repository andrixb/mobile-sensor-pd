module.exports = {
    roots: [
        "<rootDir>"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.scss$": "sass-jest"
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'scss'],
    moduleNameMapper: { '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__tests__/__mocks__/fileMock.ts'},
    snapshotSerializers: ["enzyme-to-json/serializer"],
    setupFilesAfterEnv: ["<rootDir>/__tests__/setupEnzyme.ts"],
    modulePathIgnorePatterns: [
        "__mocks__",
        "__fixtures__",
        "setupEnzyme.ts",
    ],
    coverageDirectory: "./coverage",
}
