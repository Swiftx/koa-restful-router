"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("./interfaces");
var route_1 = require("./route");
var default_1 = /** @class */ (function () {
    function default_1() {
        /**
         * 路由对象
         * @type {Router[]}
         */
        this.routes = [];
    }
    /**
     * 注册资源对象
     * @param {string} name
     * @param {Resource} resource
     */
    default_1.prototype.use = function (name, resource) {
        if ('index' in resource) {
            var router = new route_1.default(name, resource);
            router.init(resource.index, interfaces_1.HttpMethod.GET);
            this.routes.push(router);
        }
        if ('new' in resource) {
            var router = new route_1.default(name, resource);
            router.init(resource.new, interfaces_1.HttpMethod.GET, '/new');
            this.routes.push(router);
        }
        if ('create' in resource) {
            var router = new route_1.default(name, resource);
            router.init(resource.create, interfaces_1.HttpMethod.POST);
            this.routes.push(router);
        }
        if ('show' in resource) {
            var router = new route_1.default(name, resource);
            router.init(resource.show, interfaces_1.HttpMethod.GET, '/:id');
            this.routes.push(router);
        }
        if ('edit' in resource) {
            var router = new route_1.default(name, resource);
            router.init(resource.edit, interfaces_1.HttpMethod.GET, '/:id/edit');
            this.routes.push(router);
        }
        if ('put' in resource) {
            var router = new route_1.default(name, resource);
            router.init(resource.put, interfaces_1.HttpMethod.PUT, '/:id');
            this.routes.push(router);
        }
        if ('destroy' in resource) {
            var router = new route_1.default(name, resource);
            router.init(resource.destroy, interfaces_1.HttpMethod.DELETE, '/:id');
            this.routes.push(router);
        }
    };
    /**
     * 生成中间件
     * @returns {Function}
     */
    default_1.prototype.middleware = function () {
        var _this = this;
        var self = this;
        return function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, router, result;
            return __generator(this, function (_b) {
                for (_i = 0, _a = self.routes; _i < _a.length; _i++) {
                    router = _a[_i];
                    result = router.regExp(ctx.request);
                    if (result !== false) {
                        if (result === true)
                            router.exec(ctx);
                        else
                            router.exec(ctx, result);
                        break;
                    }
                }
                return [2 /*return*/];
            });
        }); };
    };
    return default_1;
}());
exports.default = default_1;
//# sourceMappingURL=dispatcher.js.map