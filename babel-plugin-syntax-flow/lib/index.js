"use strict";

exports.__esModule = true;

exports.default = function () {
  return {
    manipulateOptions: function manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("flow");
    }
  };
};

module.exports = exports["default"];