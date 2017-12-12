import * as Koa from 'koa';
import { Dispatcher } from "../src/dispatcher";
import Resource from "./resource";

// 创建资源分发器
const dispatcher = new Dispatcher();
dispatcher.use('demo', new Resource());

// 创建服务器以及中间件
const server = new Koa();
server.use(dispatcher.middleware());

// 服务器监听端口
server.listen(3000);