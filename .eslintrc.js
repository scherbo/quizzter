module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "prettier"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier"
    ],
    "settings": {
        "react": {
            "pragma": "React",
            "version": "detect"
        }
    },
    "rules": {
        "semi": "off",
        "prettier/prettier": "error",
    },
    "overrides": [
        {
            "files": ["*.ts", "*.tsx"],
            "rules": {
                "@typescript-eslint/no-unused-vars": [2, { "args": "none" }],
                "react/no-unescaped-entities": "off",
                "react/display-name": "off",
                "react/prop-types": "off",
            }
        }
    ]
};