// Generated by CoffeeScript 1.12.7
(function() {
  var Adapter, EscapeHTML, W, defaults,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Adapter = require('../../adapter_base');

  W = require('when');

  defaults = require('lodash.defaults');

  EscapeHTML = (function(superClass) {
    var compile;

    extend(EscapeHTML, superClass);

    function EscapeHTML() {
      return EscapeHTML.__super__.constructor.apply(this, arguments);
    }

    EscapeHTML.prototype.name = 'escape-html';

    EscapeHTML.prototype.extensions = ['html'];

    EscapeHTML.prototype.output = 'html';

    EscapeHTML.prototype.supportedEngines = ['he'];

    EscapeHTML.prototype.isolated = true;

    EscapeHTML.prototype._render = function(str, options) {
      options = defaults(options, {
        allowUnsafeSymbols: true
      });
      return compile((function(_this) {
        return function() {
          return _this.engine.encode(str, options);
        };
      })(this));
    };

    compile = function(fn) {
      var err, res;
      try {
        res = fn();
      } catch (error) {
        err = error;
        return W.reject(err);
      }
      return W.resolve({
        result: res
      });
    };

    return EscapeHTML;

  })(Adapter);

  module.exports = EscapeHTML;

}).call(this);
