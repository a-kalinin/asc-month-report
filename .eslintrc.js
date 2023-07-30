module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
  ],
  plugins: [
    'simple-import-sort',
  ],
  rules: {
    'no-unused-vars': 'off',
    'max-len': ['error', {
      code: 100,
      tabWidth: 2,
      ignoreUrls: true,
      ignoreComments: false,
      ignoreTrailingComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-var-requires': 'off',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/no-named-as-default': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^@?\\w'],
          [
            '^(@|api|common|components|constants|helpers|hoc|hooks|pages|store|styles|types|utils)/.*',
          ],
          ['^\\.'],
        ],
      },
    ],
    'no-console': ['error', { allow: ['warn', 'info', 'error'] }],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0, maxBOF: 0 }],
    'import/prefer-default-export': 'warn',
    'import/extensions': ['error', 'always', {
      ts: 'never',
      tsx: 'never',
      js: 'never',
      mjs: 'never',
      jsx: 'never',
    }],
    'react/require-default-props': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    // @typescript-eslint/indent has a lot of bugs,
    // so needs to have a lot of ignored nodes
    // https://github.com/typescript-eslint/typescript-eslint/issues/1824
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        ignoredNodes: [
          // Fix decorated members indentation
          // https://stackoverflow.com/questions/70642350/eslint-indent-rule-indents-decorated-members
          'FunctionExpression > .params[decorators.length > 0]',
          'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
          'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',

          // Fix multiline generics
          'TSTypeParameterInstantiation ',

          // Fix multiline union types
          'TSUnionType ',

          // Fix switch/case statement
          'SwitchStatement ',
        ],
      },

    ],
    'react/jsx-max-props-per-line': ['error', {
      maximum: {
        single: 3,
        multi: 1,
      },
    }],
  },
  overrides: [
    {
      // Disable import/prefer-default-export on next files:
      files: ['src/pages/**/*'],
      rules: { 'react/function-component-definition': 'off' },
    },
  ],
  ignorePatterns: [
    'src/utils/Roboto-Light-normal.js',
    'src/utils/Roboto-Medium-bold.js',
  ],
};
