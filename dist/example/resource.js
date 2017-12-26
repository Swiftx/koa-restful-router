"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    default_1.prototype.index = function (ctx) {
        ctx.body = 'Hello World';
    };
    default_1.prototype.show = function (ctx, id) {
        ctx.body = id;
    };
    return default_1;
}());
exports.default = default_1;
//# sourceMappingURL=resource.js.map