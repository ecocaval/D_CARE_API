import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleDirectories: ["node_modules", "src"],
    transform: {
        ".+\\.ts$": "ts-jest"
    },
	testMatch: ["<rootDir>/test/*.(test|spec).ts"]
};

export default config;