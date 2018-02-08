"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESTfulType = Symbol();
exports.RESTfulName = Symbol();
exports.RESTfulCheck = Symbol();
exports.MethodArgs = Symbol();
/**
 * REST资源控制器
 * @param {string} path
 * @param {Object} where
 * @returns {(target: Function) => void}
 * @constructor
 */
exports.RESTful = function (path, where) { return function (target) {
    target.prototype[exports.RESTfulType] = true;
    target.prototype[exports.RESTfulName] = path;
    target.prototype[exports.RESTfulCheck] = where;
}; };
/**
 * GET参数装饰器
 * @returns {(target, methodName: string, paramIndex: number) => void}
 * @constructor
 */
exports.Get = function (name) { return function (target, propertyKey, parameterIndex) {
    if (target[propertyKey][exports.MethodArgs] === undefined)
        target[propertyKey][exports.MethodArgs] = [];
    target[propertyKey][exports.MethodArgs][parameterIndex] = {
        from: 'GET',
        name: name
    };
}; };
/**
 * POST参数装饰器
 * @returns {(target, methodName: string, paramIndex: number) => void}
 * @constructor
 */
exports.Post = function (name) { return function (target, propertyKey, parameterIndex) {
    if (target[propertyKey][exports.MethodArgs] === undefined)
        target[propertyKey][exports.MethodArgs] = [];
    target[propertyKey][exports.MethodArgs][parameterIndex] = {
        from: 'POST',
        name: name
    };
}; };
/**
 * Ctx参数装饰器
 * @returns {(target, methodName: string, paramIndex: number) => void}
 * @constructor
 */
exports.Ctx = function (name) { return function (target, propertyKey, parameterIndex) {
    if (target[propertyKey][exports.MethodArgs] === undefined)
        target[propertyKey][exports.MethodArgs] = [];
    target[propertyKey][exports.MethodArgs][parameterIndex] = {
        from: 'Ctx',
        name: name
    };
}; };
//# sourceMappingURL=decorators.js.map