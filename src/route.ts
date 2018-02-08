import { Method } from './method';
import * as pathToRegexp from 'path-to-regexp';

export interface Options {
    Name : string;
    Array : boolean;
    Check : RegExp|undefined;
}

export class Route {

    /**
     * 路径匹配规则
     */
    public rule:RegExp;

    /**
     * 配置选项
     * @type {{}}
     */
    public options:Array<Options> = [];

    /**
     * 设置匹配规则
     * @param {string} value
     */
    public set path(value:string){
        this.rule = pathToRegexp(value);
        let options = <string[]>this.rule.exec(value);
        options.shift();
        delete options['index'];
        delete options['input'];
        for(let option of options) {
            let config: Options = {
                Name: option.substr(1),
                Array: false,
                Check: undefined
            };
            let end = config.Name.substr(-1);
            if (end === '+' || end === '?')
                config.Name = config.Name.substr(0, config.Name.length - 1);
            if (end === '+') config.Array = true;
            this.options.push(config);
        }
    }

    /**
     * 设置校验规则
     * @param { string } name
     * @param { RegExp } rule
     * @returns { Router }
     */
    public where(name:string, rule:RegExp){
        for(let option of this.options){
            if(option.Name !== name) continue;
            option.Check = rule;
        }
        return this;
    }

    /**
     * 请求方式
     * @type {Method[]}
     * @private
     */
    public method : Array<Method>;

    /**
     * 请求处理接口
     */
    public action : Function;

}