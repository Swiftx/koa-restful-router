/// <reference types="koa" />
import { Resource } from "../src/interfaces";
import { Context } from "koa";
export default class  implements Resource {
    index(ctx: Context): void;
    show(ctx: Context, id: string): void;
}
