import { HttpMethod, Resource } from "./interfaces";
import * as pathToRegexp from "path-to-regexp";
import {Context, Request} from "koa";

/**
 * 路由转发基类
 */
export class Route {

    /**
     * 资源名称
     */
    protected name : string;

    /**
     * 资源对象
     */
    protected resource : Resource;

    /**
     * 规则校验器
     */
    protected pathRegexp:RegExp;

    /**
     * 请求方式
     */
    protected method:HttpMethod;

    /**
     * 请求处理函数
     */
    protected action : Function;

    /**
     * 构造函数
     * @param {string} name
     * @param {Resource} resource
     */
    public constructor(name:string, resource:Resource){
        this.name = name;
        this.resource = resource;
    }

    /**
     * 初始化路由
     * @param {Function} action
     * @param {HttpMethod} method
     * @param {string} path
     */
    public init(action:Function, method:HttpMethod, path:string=''){
        this.action = action;
        this.method = method;
        this.pathRegexp = pathToRegexp('/'+this.name+path);
    }

    /**
     * 匹配请求参数
     * @param {Application.Request} req
     * @returns {boolean | string}
     */
    public regExp(req:Request):boolean|string{
        if(req.method !== this.method)
            return false;
        let result = this.pathRegexp.exec(req.url);
        if(result === null)
            return false;
        if(result[1] === undefined)
            return true;
        return result[1];
    }

    /**
     * 执行会话
     * @param {Application.Context} ctx
     * @param {string | undefined} id
     */
    public exec(ctx:Context,id?:string){
        this.action.apply(this.resource, arguments);
    }

}