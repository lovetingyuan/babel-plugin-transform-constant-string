const template = require('babel-template')
const exportTpl = template(`export const IMPORT_NAME = SOURCE;`, {
  sourceType: 'module'
});
const normalTpl = template(`const IMPORT_NAME = SOURCE;`)
let options, buildFunc

module.exports = function ({ types: t }) {
  const KEY_FUNC_NAME = 'constant'
  return {
    visitor: {
      Program(path, { opts }) {
        if (options) return
        options = opts
        if (!options.name) options.name = KEY_FUNC_NAME
        buildFunc = options.export ? exportTpl : normalTpl
      },
      CallExpression(path) {
        let buildRequier = buildFunc
        if (path.scope.parent !== null) buildRequier = normalTpl
        if (path.node.callee.name === options.name) {
          const asts = []
          for (let i = 0; i < path.node.arguments.length; i++) {
            const arg = path.node.arguments[i]
            if (path.scope.hasOwnBinding(arg.name)) {
              throw path.buildCodeFrameError(`${arg.name} has been declared`);
            }
            if (t.isIdentifier(arg)) {
              asts.push(buildRequier({
                IMPORT_NAME: t.identifier(arg.name),
                SOURCE: t.stringLiteral(arg.name)
              }))
            }
          }
          path.replaceWithMultiple(asts);
        }
      }
    }
  };
}
