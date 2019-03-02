module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "globals": {
    "document": true,
    "window": true,
    "process": true,
    "fetch": false
  },
  "plugins": ["prettier", "import"],
  "extends": ["standard", "prettier", "prettier/react", "plugin:import/warnings", "plugin:react/recommended"],
  "rules": {
    "react/forbid-prop-types": 0,
    "react/jsx-filename-extension": 0,
    "react/react-in-jsx-scope": 0,
    "class-methods-use-this": 0,
    "no-unused-expressions": ["error", { "allowTaggedTemplates": true }],
    "no-underscore-dangle": [
      "error",
      {
        "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__", "_allPostsMeta"]
      }
    ],
    "react/no-unused-prop-types": 0,
    "consistent-return": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "import/no-extraneous-dependencies": 0,
    "prettier/prettier": "error",
    "react/destructuring-assignment": 0,
    "linebreak-style": ["error", "unix"],
    "indent": ["error", "tab", {"SwitchCase":1}],
  }
}
