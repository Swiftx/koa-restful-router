import { Route } from './route';
import { Method } from './method';
export declare class Router {
    /**
     * 路由数组
     * @type {Route[]}
     */
    protected routes: Array<Route>;
    /**
     * 设置请求方式
     * @param {string} path
     * @param {Array<Method>} method
     * @param {Function} action
     * @returns {Route}
     */
    method(path: string, method: Array<Method>, action: Function): Route;
    /**
     * 设置GET方式请求
     * @param {string} path
     * @param {Function} action
     * @returns {Route}
     */
    get(path: string, action: Function): Route;
    /**
     * 设置GET方式请求
     * @param {string} path
     * @param {Function} action
     * @returns {Route}
     */
    post(path: string, action: Function): Route;
    /**
     * 设置GET方式请求
     * @param {string} path
     * @param {Function} action
     * @returns {Route}
     */
    put(path: string, action: Function): Route;
    /**
     * 设置GET方式请求
     * @param {string} path
     * @param {Function} action
     * @returns {Route}
     */
    delete(path: string, action: Function): Route;
    /**
     * 注册控制器
     * @param {Object} controller
     */
    use(controller: Object): boolean;
    protected registerRestApi(controller: Object, method: string): void;
    /**
     * 生成参数
     * @param ctx
     * @param config
     * @returns {Array<any>}
     */
    protected buildArgs(ctx: any, config: any): Array<any>;
    /**
     * 中间件
     * @returns {(ctx, next) => Function}
     */
    middleware: () => any;
    /**
     * 中间件执行器
     * @param ctx
     * @returns {Promise<void>}
     */
    exec(ctx: any): Promise<void>;
}
