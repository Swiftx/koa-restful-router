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
var route_1 = require("./route");
var method_1 = require("./method");
var decorators_1 = require("./decorators");
var Router = /** @class */ (function () {
    function Router() {
        var _this = this;
        /**
         * 路由数组
         * @type {Route[]}
         */
        this.routes = [];
        /**
         * 中间件
         * @returns {(ctx, next) => Function}
         */
        this.middleware = function () { return _this.exec.bind(_this); };
    }
    /**
     * 设置请求方式
     * @param {string} path
     * @param {Array<Method>} method
     * @param {Function} action
     * @returns {Route}
     */
    Router.prototype.method = function (path, method, action) {
        var route = new route_1.Route();
        route.method = method;
        route.path = path;
        route.action = action;
        this.routes.push(route);
        return route;
    };
    /**
     * 设置GET方式请求
     * @param {string} path
     * @param {Function} action
     * @returns {Route}
     */
    Router.prototype.get = function (path, action) {
        return this.method(path, [method_1.Method.GET], action);
    };
    /**
     * 设置GET方式请求
     * @param {string} path
     * @param {Function} action
     * @returns {Route}
     */
    Router.prototype.post = function (path, action) {
        return this.method(path, [method_1.Method.POST], action);
    };
    /**
     * 设置GET方式请求
     * @param {string} path
     * @param {Function} action
     * @returns {Route}
     */
    Router.prototype.put = function (path, action) {
        return this.method(path, [method_1.Method.PUT], action);
    };
    /**
     * 设置GET方式请求
     * @param {string} path
     * @param {Function} action
     * @returns {Route}
     */
    Router.prototype.delete = function (path, action) {
        return this.method(path, [method_1.Method.DELETE], action);
    };
    /**
     * 注册控制器
     * @param {Object} controller
     */
    Router.prototype.use = function (controller) {
        if (!controller[decorators_1.RESTfulType])
            return false;
        this.registerRestApi(controller, 'get');
        this.registerRestApi(controller, 'post');
        this.registerRestApi(controller, 'put');
        this.registerRestApi(controller, 'delete');
        return true;
    };
    Router.prototype.registerRestApi = function (controller, method) {
        if (!(method in controller))
            return;
        var action = controller[method].bind(controller);
        Object.assign(action, controller[method]);
        var router = this[method](controller[decorators_1.RESTfulName], action);
        if (action[decorators_1.RESTfulCheck]) {
            for (var rule in action[decorators_1.RESTfulCheck])
                router.where(rule, action[rule]);
        }
    };
    /**
     * 生成参数
     * @param ctx
     * @param config
     * @returns {Array<any>}
     */
    Router.prototype.buildArgs = function (ctx, config) {
        var args = [];
        for (var _i = 0, config_1 = config; _i < config_1.length; _i++) {
            var option = config_1[_i];
            var value = undefined;
            switch (option.from) {
                case 'GET':
                    value = ctx.request.params[option.name];
                    break;
                case 'POST':
                    value = ctx.request.body[option.name];
                    break;
                case 'Ctx':
                    value = ctx[option.name];
            }
            args.push(value);
        }
        return args;
    };
    /**
     * 中间件执行器
     * @param ctx
     * @returns {Promise<void>}
     */
    Router.prototype.exec = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, route, params, i, index, option, value, _b, args, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _i = 0, _a = this.routes;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        route = _a[_i];
                        // 校验正则规则
                        if (!route.method.includes(ctx.request.method.toLowerCase()))
                            return [3 /*break*/, 6];
                        params = route.rule.exec(ctx.request.path);
                        if (params === null)
                            return [3 /*break*/, 6];
                        // 解析GET请求参数
                        if (!ctx.request.params)
                            ctx.request.params = {};
                        for (i in route.options) {
                            index = parseInt(i);
                            option = route.options[index];
                            value = params[index + 1];
                            ctx.request.params[option.Name] = option.Array ? value.split('/') : value;
                        }
                        if (!!route.action[decorators_1.MethodArgs]) return [3 /*break*/, 3];
                        _b = ctx.response;
                        return [4 /*yield*/, route.action(ctx.request, ctx.response)];
                    case 2:
                        _b.body = _d.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        args = this.buildArgs(ctx, route.action[decorators_1.MethodArgs]);
                        _c = ctx.response;
                        return [4 /*yield*/, route.action.apply(route, args)];
                    case 4:
                        _c.body = _d.sent();
                        _d.label = 5;
                    case 5: return [2 /*return*/];
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Router;
}());
exports.Router = Router;
//# sourceMappingURL=router.js.map