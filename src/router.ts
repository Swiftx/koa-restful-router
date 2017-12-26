import { HttpMethod, Resource } from "./interfaces";
import { Route } from './route';
import { Context } from "koa";

export class Router {

    /**
     * 路由对象
     * @type {Route[]}
     */
    protected routes:Array<Route> = [];

    /**
     * 注册资源对象
     * @param {string} name
     * @param {Resource} resource
     */
    public use(name: string , resource : Resource) {
        if ('index' in resource){
            let router = new Route(name, resource);
            router.init(<Function>resource.index, HttpMethod.GET);
            this.routes.push(router);
        }
        if ('new' in resource){
            let router = new Route(name, resource);
            router.init(<Function>resource.new, HttpMethod.GET, '/new');
            this.routes.push(router);
        }
        if ('create' in resource){
            let router = new Route(name, resource);
            router.init(<Function>resource.create, HttpMethod.POST);
            this.routes.push(router);
        }
        if ('show' in resource){
            let router = new Route(name, resource);
            router.init(<Function>resource.show, HttpMethod.GET, '/:id');
            this.routes.push(router);
        }
        if ('edit' in resource){
            let router = new Route(name, resource);
            router.init(<Function>resource.edit, HttpMethod.GET, '/:id/edit');
            this.routes.push(router);
        }
        if ('put' in resource){
            let router = new Route(name, resource);
            router.init(<Function>resource.put, HttpMethod.PUT, '/:id');
            this.routes.push(router);
        }
        if ('destroy' in resource){
            let router = new Route(name, resource);
            router.init(<Function>resource.destroy, HttpMethod.DELETE, '/:id');
            this.routes.push(router);
        }
    }

    /**
     * 批量注册控制器
     * @param {Object} resources
     * @param {string} prefix
     */
    public uses(resources:Object, prefix:string=''){
        for(let i in resources)
            this.use(prefix+i, resources[i]);
    }

    /**
     * 生成中间件
     * @returns {Function}
     */
    public middleware(){
        const self = this;
        return async (ctx:Context) => {
            for(let router of self.routes){
                let result = router.regExp(ctx.request);
                if(result !== false) {
                    if(result === true)
                        router.exec(ctx);
                    else router.exec(ctx, result);
                    break;
                }
            }
        }
    }

}
