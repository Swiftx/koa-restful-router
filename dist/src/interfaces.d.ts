export interface Resource {
    /**
     * GET	    /{controller}
     */
    index?: Function;
    /**
     * GET	    /{controller}/new
     */
    new?: Function;
    /**
     * POST	    /{controller}
     */
    create?: Function;
    /**
     * GET	    /{controller}/:id
     */
    show?: Function;
    /**
     * GET	    /{controller}/:id/edit
     */
    edit?: Function;
    /**
     * PUT	    /{controller}/:id
     */
    put?: Function;
    /**
     * DELETE   /{controller}/:id
     */
    destroy?: Function;
}
export declare enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}
