/// <reference types="node" />
import { ServerResponse, IncomingMessage, Server } from "http";
declare type RequestHandler = (req: IncomingMessage, res: ServerResponse) => void;
declare type HttpMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
declare type ServerStartType = {
    routes?: {
        path: string | {
            path: string;
            exact?: boolean;
            method: HttpMethods;
        };
        handler: RequestHandler;
    }[];
    notFoundHandler?: RequestHandler;
    errorHandler?: RequestHandler;
};
declare class ApiRouter {
    port: number;
    host: string;
    httpServer: Server | undefined;
    constructor(port: number, host: string);
    /**
     * configures the router
     * @param routes routes
     * @param req request
     * @param res response
     * @returns
     */
    router: (routes: ServerStartType, req: IncomingMessage, res: ServerResponse) => void;
    /**
     * the server start listener
     * @param routes route list
     */
    start(routes: ServerStartType): void;
    /**
     * return the server instance
     * @returns server
     */
    getServer(): Server<typeof IncomingMessage, typeof ServerResponse> | undefined;
}
export = ApiRouter;
