"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pathToRegexp = require("path-to-regexp");
var Route = /** @class */ (function () {
    function Route() {
        /**
         * 配置选项
         * @type {{}}
         */
        this.options = [];
    }
    Object.defineProperty(Route.prototype, "path", {
        /**
         * 设置匹配规则
         * @param {string} value
         */
        set: function (value) {
            this.rule = pathToRegexp(value);
            var options = this.rule.exec(value);
            options.shift();
            delete options['index'];
            delete options['input'];
            for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                var option = options_1[_i];
                var config = {
                    Name: option.substr(1),
                    Array: false,
                    Check: undefined
                };
                var end = config.Name.substr(-1);
                if (end === '+' || end === '?')
                    config.Name = config.Name.substr(0, config.Name.length - 1);
                if (end === '+')
                    config.Array = true;
                this.options.push(config);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置校验规则
     * @param { string } name
     * @param { RegExp } rule
     * @returns { Router }
     */
    Route.prototype.where = function (name, rule) {
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var option = _a[_i];
            if (option.Name !== name)
                continue;
            option.Check = rule;
        }
        return this;
    };
    return Route;
}());
exports.Route = Route;
//# sourceMappingURL=route.js.map