module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import",
  ],
  "rules": {
    "react/jsx-filename-extension": [1, { 
        "extensions": [".js", ".jsx"] 
    }],
    "react/require-default-props": [0],
    "react/no-unused-prop-types": [2, {
        "skipShapeProps": true
    }],
    "react/no-multi-comp": [0],
    "no-bitwise": [0],
    "no-empty-label": 0,
    "no-console": 0,
    "import/no-unresolved": 0,
    "global-require": 0,
    "no-underscore-dangle": 0,
    "space-before-keywords": 0,
    "space-after-keywords": 0,
    "space-return-throw-case": 0,
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }],
    "react/prefer-stateless-function": 0
  },
};