"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pathToRegexp = require("path-to-regexp");
/**
 * 路由转发基类
 */
var Route = /** @class */ (function () {
    /**
     * 构造函数
     * @param {string} name
     * @param {Resource} resource
     */
    function Route(name, resource) {
        this.name = name;
        this.resource = resource;
    }
    /**
     * 初始化路由
     * @param {Function} action
     * @param {HttpMethod} method
     * @param {string} path
     */
    Route.prototype.init = function (action, method, path) {
        if (path === void 0) { path = ''; }
        this.action = action;
        this.method = method;
        this.pathRegexp = pathToRegexp('/' + this.name + path);
    };
    /**
     * 匹配请求参数
     * @param {Application.Request} req
     * @returns {boolean | string}
     */
    Route.prototype.regExp = function (req) {
        if (req.method !== this.method)
            return false;
        var result = this.pathRegexp.exec(req.url);
        if (result === null)
            return false;
        if (result[1] === undefined)
            return true;
        return result[1];
    };
    /**
     * 执行会话
     * @param {Application.Context} ctx
     * @param {string | undefined} id
     */
    Route.prototype.exec = function (ctx, id) {
        this.action.apply(this.resource, arguments);
    };
    return Route;
}());
exports.Route = Route;
//# sourceMappingURL=route.js.map