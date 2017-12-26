/// <reference types="koa" />
import { Resource } from "./interfaces";
import { Route } from './route';
import { Context } from "koa";
export declare class Router {
    /**
     * 路由对象
     * @type {Route[]}
     */
    protected routes: Array<Route>;
    /**
     * 注册资源对象
     * @param {string} name
     * @param {Resource} resource
     */
    use(name: string, resource: Resource): void;
    /**
     * 批量注册控制器
     * @param {Object} resources
     * @param {string} prefix
     */
    uses(resources: Object, prefix?: string): void;
    /**
     * 生成中间件
     * @returns {Function}
     */
    middleware(): (ctx: Context) => Promise<void>;
}
