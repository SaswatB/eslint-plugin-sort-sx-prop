/**
 * @fileoverview Sort the sx prop
 * @author Saswat Bhattacharya
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/sort-sx-prop"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, ecmaFeatures: { jsx: true } },
});
ruleTester.run("sort-sx-prop", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "<Box sx={{ customPropB: 0, customPropA: 0, borderColor: 'red', top: 0, paddingTop: 0, position: 'absolute' }} />",
      errors: [
        {
          message: "The sx prop is not sorted",
          type: "JSXAttribute",
        },
      ],
      output:
        "<Box sx={{ position: 'absolute', top: 0, paddingTop: 0, borderColor: 'red', customPropA: 0, customPropB: 0 }} />",
    },
    {
      code: `
<Box
  sx={{
    customPropB: 0,
    customPropA: 0,
    borderColor: 'red',
    top: 0,
    paddingTop: 0,
    position: 'absolute',
  }}
/>`,
      errors: [
        {
          message: "The sx prop is not sorted",
          type: "JSXAttribute",
        },
      ],
      output: `
<Box
  sx={{
    position: 'absolute',
    top: 0,
    paddingTop: 0,
    borderColor: 'red',
    customPropA: 0,
    customPropB: 0,
  }}
/>`,
    },
    {
      code: `
<Box
  sx={{
    customPropB: 0,
    customPropA: 0,
    borderColor: 'red',
    top: 0,
    paddingTop: 0,
    position: 'absolute',
  }}
/>`,
      options: [{ addWhitespace: true }],
      errors: [
        {
          message: "The sx prop is not sorted",
          type: "JSXAttribute",
        },
      ],
      output: `
<Box
  sx={{
    position: 'absolute',
    top: 0,

    paddingTop: 0,

    borderColor: 'red',

    customPropA: 0,
    customPropB: 0,
  }}
/>`,
    },
  ],
});
