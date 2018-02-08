import { Method } from './method';
export interface Options {
    Name: string;
    Array: boolean;
    Check: RegExp | undefined;
}
export declare class Route {
    /**
     * 路径匹配规则
     */
    rule: RegExp;
    /**
     * 配置选项
     * @type {{}}
     */
    options: Array<Options>;
    /**
     * 设置匹配规则
     * @param {string} value
     */
    path: string;
    /**
     * 设置校验规则
     * @param { string } name
     * @param { RegExp } rule
     * @returns { Router }
     */
    where(name: string, rule: RegExp): this;
    /**
     * 请求方式
     * @type {Method[]}
     * @private
     */
    method: Array<Method>;
    /**
     * 请求处理接口
     */
    action: Function;
}
