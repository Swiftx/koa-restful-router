/// <reference types="koa" />
import { Resource } from "./interfaces";
import { Route } from './route';
import { Context } from "koa";
export declare class Dispatcher {
    /**
     * 路由对象
     * @type {Router[]}
     */
    protected routes: Array<Route>;
    /**
     * 注册资源对象
     * @param {string} name
     * @param {Resource} resource
     */
    use(name: string, resource: Resource): void;
    /**
     * 生成中间件
     * @returns {Function}
     */
    middleware(): (ctx: Context) => Promise<void>;
}
