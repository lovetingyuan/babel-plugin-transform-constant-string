'use strict';

var template = require('babel-template');
var exportTpl = template('export const IMPORT_NAME = SOURCE;', {
  sourceType: 'module'
});
var normalTpl = template('const IMPORT_NAME = SOURCE;');
var options = void 0,
    buildFunc = void 0;

module.exports = function (_ref) {
  var t = _ref.types;

  var KEY_FUNC_NAME = 'constant';
  return {
    visitor: {
      Program: function Program(path, _ref2) {
        var opts = _ref2.opts;

        if (options) return;
        options = opts;
        if (!options.name) options.name = KEY_FUNC_NAME;
        buildFunc = options.export ? exportTpl : normalTpl;
      },
      CallExpression: function CallExpression(path) {
        var buildRequier = buildFunc;
        if (path.scope.parent !== null) buildRequier = normalTpl;
        if (path.node.callee.name === options.name) {
          var asts = [];
          for (var i = 0; i < path.node.arguments.length; i++) {
            var arg = path.node.arguments[i];
            if (path.scope.hasOwnBinding(arg.name)) {
              throw path.buildCodeFrameError(arg.name + ' has been declared');
            }
            if (t.isIdentifier(arg)) {
              asts.push(buildRequier({
                IMPORT_NAME: t.identifier(arg.name),
                SOURCE: t.stringLiteral(arg.name)
              }));
            }
          }
          path.replaceWithMultiple(asts);
        }
      }
    }
  };
};