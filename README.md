# eslint-plugin-sort-sx-prop

Sorts the sx prop from ui libraries like MUI

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-sort-sx-prop`:

```sh
npm install eslint-plugin-sort-sx-prop --save-dev
```

## Usage

Add `sort-sx-prop` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["sort-sx-prop"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "sort-sx-prop/sort-sx-prop": 2
  }
}
```

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                       | Description      | 🔧  |
| :----------------------------------------- | :--------------- | :-- |
| [sort-sx-prop](docs/rules/sort-sx-prop.md) | Sort the sx prop | 🔧  |

<!-- end auto-generated rules list -->
