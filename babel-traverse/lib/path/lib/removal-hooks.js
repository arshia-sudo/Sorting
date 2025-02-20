"use strict";

exports.__esModule = true;
var hooks = exports.hooks = [function (self, parent) {
  if (self.key === "body" && parent.isArrowFunctionExpression()) {
    self.replaceWith(self.scope.buildUndefinedNode());
    return true;
  }
}, function (self, parent) {
  var removeParent = false;

  removeParent = removeParent || self.key === "test" && (parent.isWhile() || parent.isSwitchCase());

  removeParent = removeParent || self.key === "declaration" && parent.isExportDeclaration();

  removeParent = removeParent || self.key === "body" && parent.isLabeledStatement();

  removeParent = removeParent || self.listKey === "declarations" && parent.isVariableDeclaration() && parent.node.declarations.length === 1;

  removeParent = removeParent || self.key === "expression" && parent.isExpressionStatement();

  if (removeParent) {
    parent.remove();
    return true;
  }
}, function (self, parent) {
  if (parent.isSequenceExpression() && parent.node.expressions.length === 1) {
    parent.replaceWith(parent.node.expressions[0]);
    return true;
  }
}, function (self, parent) {
  if (parent.isBinary()) {
    if (self.key === "left") {
      parent.replaceWith(parent.node.right);
    } else {
      parent.replaceWith(parent.node.left);
    }
    return true;
  }
}, function (self, parent) {
  if (parent.isIfStatement() && (self.key === "consequent" || self.key === "alternate") || parent.isLoop() && self.key === "body") {
    self.replaceWith({
      type: "BlockStatement",
      body: []
    });
    return true;
  }
}];