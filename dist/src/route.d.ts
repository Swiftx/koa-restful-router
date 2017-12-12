/// <reference types="koa" />
import { HttpMethod, Resource } from "./interfaces";
import { Context, Request } from "koa";
/**
 * 路由转发基类
 */
export declare class Route {
    /**
     * 资源名称
     */
    protected name: string;
    /**
     * 资源对象
     */
    protected resource: Resource;
    /**
     * 规则校验器
     */
    protected pathRegexp: RegExp;
    /**
     * 请求方式
     */
    protected method: HttpMethod;
    /**
     * 请求处理函数
     */
    protected action: Function;
    /**
     * 构造函数
     * @param {string} name
     * @param {Resource} resource
     */
    constructor(name: string, resource: Resource);
    /**
     * 初始化路由
     * @param {Function} action
     * @param {HttpMethod} method
     * @param {string} path
     */
    init(action: Function, method: HttpMethod, path?: string): void;
    /**
     * 匹配请求参数
     * @param {Application.Request} req
     * @returns {boolean | string}
     */
    regExp(req: Request): boolean | string;
    /**
     * 执行会话
     * @param {Application.Context} ctx
     * @param {string | undefined} id
     */
    exec(ctx: Context, id?: string): void;
}
