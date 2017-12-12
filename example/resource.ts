import { Resource } from "../src/interfaces";
import { Context } from "koa";

export default class implements Resource{

    public index(ctx:Context){
        ctx.body = 'Hello World';
    }

    public show(ctx:Context, id:string){
        ctx.body = id;
    }

}