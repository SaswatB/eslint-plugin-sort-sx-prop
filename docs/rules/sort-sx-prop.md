# Sort the sx prop (`sort-sx-prop/sort-sx-prop`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

I wish I had sorting for the sx prop in MUI. So I made it.

## Rule Details

This rule aims to sort the sx prop similar to how stylelint-order sorts CSS properties.

Examples of **incorrect** code for this rule:

```js
<Box
  sx={{
    customPropB: 0,
    customPropA: 0,
    borderColor: "red",
    top: 0,
    paddingTop: 0,
    position: "absolute",
  }}
/>
```

Examples of **correct** code for this rule:

```js
<Box
  sx={{
    position: "absolute",
    top: 0,
    paddingTop: 0,
    borderColor: "red",
    customPropA: 0,
    customPropB: 0,
  }}
/>
```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
