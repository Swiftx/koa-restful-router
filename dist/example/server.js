"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var dispatcher_1 = require("../src/dispatcher");
var resource_1 = require("./resource");
// 创建资源分发器
var dispatcher = new dispatcher_1.Dispatcher();
dispatcher.use('demo', new resource_1.default());
// 创建服务器以及中间件
var server = new Koa();
server.use(dispatcher.middleware());
// 服务器监听端口
server.listen(3000);
//# sourceMappingURL=server.js.map