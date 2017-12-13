"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var router_1 = require("../src/router");
var resource_1 = require("./resource");
// 创建资源分发器
var router = new router_1.Router();
router.use('demo', new resource_1.default());
// 创建服务器以及中间件
var server = new Koa();
server.use(router.middleware());
// 服务器监听端口
server.listen(3000);
//# sourceMappingURL=server.js.map