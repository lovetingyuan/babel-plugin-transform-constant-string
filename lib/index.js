'use strict';

var template = require('babel-template');
var exportTpl = template('export const CONSTVARNAME = CONSTSTRING;', {
  sourceType: 'module'
});
var normalTpl = template('const CONSTVARNAME = CONSTSTRING;');
var options = void 0;
var KEY_FUNC_NAME = 'CONST';
var KEY_EXPORT_FUNC_NAME = 'CONSPORT';

module.exports = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      Program: function Program(path, _ref2) {
        var opts = _ref2.opts;

        if (options) return;
        options = opts;
        if (!options.callName) options.callName = KEY_FUNC_NAME;
        if (!options.exportCallName) options.exportCallName = KEY_EXPORT_FUNC_NAME;
      },
      CallExpression: function CallExpression(path) {
        var funcName = path.node.callee.name;
        if ([options.callName, options.exportCallName].indexOf(funcName) === -1) return;
        var asts = [];
        var buildRequier = normalTpl;
        if (funcName === options.exportCallName && !path.scope.parent) {
          buildRequier = exportTpl;
        }
        for (var i = 0; i < path.node.arguments.length; i++) {
          var arg = path.node.arguments[i];
          if (path.scope.hasOwnBinding(arg.name)) {
            throw path.buildCodeFrameError(arg.name + ' has been declared');
          }
          if (t.isIdentifier(arg)) {
            asts.push(buildRequier({
              CONSTVARNAME: t.identifier(arg.name),
              CONSTSTRING: t.stringLiteral(arg.name)
            }));
          }
        }
        path.replaceWithMultiple(asts);
      }
    }
  };
};