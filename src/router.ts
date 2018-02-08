import { Route } from './route';
import { Method } from './method';
import {MethodArgs, RESTfulCheck, RESTfulName, RESTfulType} from './decorators';

export class Router {

    /**
     * 路由数组
     * @type {Route[]}
     */
    protected routes:Array<Route> = [];

    /**
     * 设置请求方式
     * @param {string} path
     * @param {Array<Method>} method
     * @param {Function} action
     * @returns {Route}
     */
    public method(path:string,method:Array<Method>, action : Function):Route{
        let route = new Route();
        route.method = method;
        route.path = path;
        route.action = action;
        this.routes.push(route);
        return route;
    }

    /**
     * 设置GET方式请求
     * @param {string} path
     * @param {Function} action
     * @returns {Route}
     */
    public get(path:string, action : Function):Route{
        return this.method(path, [Method.GET], action);
    }

    /**
     * 设置GET方式请求
     * @param {string} path
     * @param {Function} action
     * @returns {Route}
     */
    public post(path:string, action : Function):Route{
        return this.method(path, [Method.POST], action);
    }

    /**
     * 设置GET方式请求
     * @param {string} path
     * @param {Function} action
     * @returns {Route}
     */
    public put(path:string, action : Function):Route{
        return this.method(path, [Method.PUT], action);
    }

    /**
     * 设置GET方式请求
     * @param {string} path
     * @param {Function} action
     * @returns {Route}
     */
    public delete(path:string, action : Function):Route{
        return this.method(path, [Method.DELETE], action);
    }

    /**
     * 注册控制器
     * @param {Object} controller
     */
    public use(controller: Object) {
        if(!controller[RESTfulType]) return false;
        this.registerRestApi(controller,'get');
        this.registerRestApi(controller,'post');
        this.registerRestApi(controller,'put');
        this.registerRestApi(controller,'delete');
        return true;
    }

    protected registerRestApi(controller:Object,method:string){
        if(!(method in controller)) return;
        let action = controller[method].bind(controller);
        Object.assign(action, controller[method]);
        let router = this[method](controller[RESTfulName], action);
        if(action[RESTfulCheck]) {
            for (let rule in action[RESTfulCheck])
                router.where(rule, action[rule]);
        }
    }

    /**
     * 生成参数
     * @param ctx
     * @param config
     * @returns {Array<any>}
     */
    protected buildArgs(ctx, config):Array<any>{
        let args:Array<any> = [];
        for(let option of config){
            let value = undefined;
            switch (option.from){
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
    }

    /**
     * 中间件
     * @returns {(ctx, next) => Function}
     */
    public middleware = () => this.exec.bind(this);

    /**
     * 中间件执行器
     * @param ctx
     * @returns {Promise<void>}
     */
    public async exec(ctx){
        for(let route of this.routes) {
            // 校验正则规则
            if (!route.method.includes(ctx.request.method.toLowerCase())) continue;
            let params = route.rule.exec(ctx.request.path);
            if (params === null) continue;
            // 解析GET请求参数
            if(!ctx.request.params)
                ctx.request.params = {};
            for(let i in route.options){
                let index = parseInt(i);
                let option = route.options[index];
                let value = params[index+1];
                ctx.request.params[option.Name] = option.Array?value.split('/'):value;
            }
            // 执行用户函数
            if(!route.action[MethodArgs]) {
                ctx.response.body = await route.action(ctx.request, ctx.response);
            } else {
                let args = this.buildArgs(ctx, route.action[MethodArgs]);
                ctx.response.body = await route.action(...args);
            }
            return;
        }
    }

}