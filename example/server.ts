import * as Koa from 'koa';
import { Router } from "../src/router";
import Resource from "./resource";

// 创建资源分发器
const router = new Router();
router.use('demo', new Resource());

// 创建服务器以及中间件
const server = new Koa();
server.use(router.middleware());

// 服务器监听端口
server.listen(3000);