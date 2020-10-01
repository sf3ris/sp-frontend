module.exports = {
    "roots": [
      "<rootDir>/test"
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest",
      ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/node_modules/jest-css-modules-transform",
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    "moduleNameMapper" : {
      "^.+\\.(svg|png)$": "<rootDir>/test/__mocks__/file-stub.ts"
    },
    "setupFilesAfterEnv": ["<rootDir>/setupTest.ts"]
  }