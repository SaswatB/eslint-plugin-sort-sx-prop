/**
 * @fileoverview Sort the sx prop
 * @description * @author Saswat Bhattacharya
 */
"use strict";

/** @param {string} s */
function kebabToCamel(s) {
  return s.replace(/(-\w)/g, function (m) {
    return m[1].toUpperCase();
  });
}

// collect the order of the css properties from the groups file
const groups = require("../groups");
const groupMap = groups.reduce((acc, group) => {
  group.properties.forEach((property) => {
    acc[kebabToCamel(property)] = group;
  });
  return acc;
}, {});
const order = groups.flatMap((group) => group.properties.map(kebabToCamel));
const orderMap = order.reduce((acc, key, index) => {
  acc[key] = index;
  return acc;
}, {});

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Sort the sx prop",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: { addWhitespace: { type: "boolean" } },
        additionalProperties: false,
      },
    ], // Add a schema if the rule has options
    messages: { violation: "The sx prop is not sorted" },
  },

  create(context) {
    const options = context.options[0] || {};
    const addWhitespace = options.addWhitespace || false;

    return {
      /** @param {import('eslint').Rule.Node} node */
      JSXAttribute(node) {
        if (node.name.name === "sx") {
          // Check if the value is an object expression.
          if (node.value.expression.type === "ObjectExpression") {
            const properties = node.value.expression.properties;
            const knownProperties = properties.filter(
              (p) => orderMap[p.key.name] !== undefined
            );
            const unknownProperties = properties.filter(
              (p) => orderMap[p.key.name] === undefined
            );
            const sortedProperties = [...knownProperties]
              // Sort known properties by their order in the order array.
              .sort((a, b) => orderMap[a.key.name] - orderMap[b.key.name])
              // Sort unknown properties alphabetically.
              .concat(
                unknownProperties.sort((a, b) =>
                  a.key.name.localeCompare(b.key.name)
                )
              );

            for (let i = 0; i < properties.length; i++) {
              if (properties[i].key.name !== sortedProperties[i].key.name) {
                context.report({
                  node,
                  messageId: "violation",
                  fix(fixer) {
                    const fixes = [];
                    let group = null;
                    let line = null;

                    sortedProperties.forEach((property, index) => {
                      const text = context.getSourceCode().getText(property);
                      const ogNode = properties[index];
                      const range = ogNode.range;
                      console.log(group);

                      fixes.push(fixer.replaceTextRange(range, text));
                      if (addWhitespace) {
                        // add line break if the group changes
                        // and the line is not the same as the original node
                        if (
                          group &&
                          group !== groupMap[property.key.name] &&
                          line !== null &&
                          line !== ogNode.loc.start.line
                        ) {
                          fixes.push(
                            fixer.insertTextBeforeRange(
                              [range[0] - ogNode.loc.start.column, 0],
                              "\n"
                            )
                          );
                        }
                        group = groupMap[property.key.name];
                        line = ogNode.loc.start.line;
                      }
                    });

                    return fixes;
                  },
                });

                // We've reported a problem, no need to check further.
                break;
              }
            }
          }
        }
      },
    };
  },
};
