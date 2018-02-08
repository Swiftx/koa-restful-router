export declare const RESTfulType: unique symbol;
export declare const RESTfulName: unique symbol;
export declare const RESTfulCheck: unique symbol;
export declare const MethodArgs: unique symbol;
/**
 * REST资源控制器
 * @param {string} path
 * @param {Object} where
 * @returns {(target: Function) => void}
 * @constructor
 */
export declare const RESTful: (path: string, where?: Object | undefined) => (target: Function) => void;
/**
 * GET参数装饰器
 * @returns {(target, methodName: string, paramIndex: number) => void}
 * @constructor
 */
export declare const Get: (name?: string | undefined) => (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
/**
 * POST参数装饰器
 * @returns {(target, methodName: string, paramIndex: number) => void}
 * @constructor
 */
export declare const Post: (name?: string | undefined) => (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
/**
 * Ctx参数装饰器
 * @returns {(target, methodName: string, paramIndex: number) => void}
 * @constructor
 */
export declare const Ctx: (name?: string | undefined) => (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
