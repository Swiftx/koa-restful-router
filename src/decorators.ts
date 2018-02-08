export const RESTfulType = Symbol();
export const RESTfulName = Symbol();
export const RESTfulCheck = Symbol();
export const MethodArgs = Symbol();

/**
 * REST资源控制器
 * @param {string} path
 * @param {Object} where
 * @returns {(target: Function) => void}
 * @constructor
 */
export const RESTful = (path:string,where?:Object) => (target:Function) =>{
    target.prototype[RESTfulType] = true;
    target.prototype[RESTfulName] = path;
    target.prototype[RESTfulCheck] = where;
};

/**
 * GET参数装饰器
 * @returns {(target, methodName: string, paramIndex: number) => void}
 * @constructor
 */
export const Get = (name?:string) => (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    if(target[propertyKey][MethodArgs] === undefined)
        target[propertyKey][MethodArgs] = [];
    target[propertyKey][MethodArgs][parameterIndex] = {
        from : 'GET',
        name : name
    }
};

/**
 * POST参数装饰器
 * @returns {(target, methodName: string, paramIndex: number) => void}
 * @constructor
 */
export const Post = (name?:string) => (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    if(target[propertyKey][MethodArgs] === undefined)
        target[propertyKey][MethodArgs] = [];
    target[propertyKey][MethodArgs][parameterIndex] = {
        from : 'POST',
        name : name
    }
};

/**
 * Ctx参数装饰器
 * @returns {(target, methodName: string, paramIndex: number) => void}
 * @constructor
 */
export const Ctx = (name?:string) => (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    if(target[propertyKey][MethodArgs] === undefined)
        target[propertyKey][MethodArgs] = [];
    target[propertyKey][MethodArgs][parameterIndex] = {
        from : 'Ctx',
        name : name
    }
};