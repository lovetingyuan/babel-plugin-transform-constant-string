const template = require('babel-template')
const exportTpl = template(`export const CONSTVARNAME = CONSTSTRING;`, {
  sourceType: 'module'
});
const normalTpl = template(`const CONSTVARNAME = CONSTSTRING;`)
let options
const KEY_FUNC_NAME = 'CONST'
const KEY_EXPORT_FUNC_NAME = 'CONSPORT'

module.exports = function ({ types: t }) {
  return {
    visitor: {
      Program(path, { opts }) {
        if (options) return
        options = opts
        if (!options.callName) options.callName = KEY_FUNC_NAME
        if (!options.exportCallName) options.exportCallName = KEY_EXPORT_FUNC_NAME
      },
      CallExpression(path) {
        const funcName = path.node.callee.name
        if ([options.callName, options.exportCallName].indexOf(funcName) === -1) return;
        const asts = []
        let buildRequier = normalTpl
        if (funcName === options.exportCallName && !path.scope.parent) {
          buildRequier = exportTpl
        }
        for (let i = 0; i < path.node.arguments.length; i++) {
          const arg = path.node.arguments[i]
          if (path.scope.hasOwnBinding(arg.name)) {
            throw path.buildCodeFrameError(`${arg.name} has been declared`);
          }
          if (t.isIdentifier(arg)) {
            asts.push(buildRequier({
              CONSTVARNAME: t.identifier(arg.name),
              CONSTSTRING: t.stringLiteral(arg.name)
            }))
          }
        }
        path.replaceWithMultiple(asts);
      }
    }
  };
}
