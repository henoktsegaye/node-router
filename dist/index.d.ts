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
export default class ApiRouter {
    port: number;
    host: string;
    httpServer: Server | undefined;
    constructor(port: number, host: string);
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
export type { RequestHandler, HttpMethods, ServerStartType };
