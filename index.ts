import {
  ServerResponse,
  createServer,
  IncomingMessage,
  Server,
  METHODS,
} from "http";
import { parse } from "url";

type RequestHandler = (req: IncomingMessage, res: ServerResponse) => void;

type HttpMethods =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS";

type ServerStartType = {
  routes?: {
    path:
      | string
      | {
          path: string;
          exact?: boolean;
          method: HttpMethods;
        }; // [GET] /api/v1/hello
    handler: RequestHandler;
  }[];
  notFoundHandler?: RequestHandler;
  errorHandler?: RequestHandler;
};

export default class ApiRouter {
  port;
  host;
  httpServer: Server | undefined;

  constructor(port: number, host: string) {
    this.port = port;
    this.host = host;
  }
  /**
   * configures the router
   * @param routes routes
   * @param req request
   * @param res response
   * @returns
   */
  router = (
    routes: ServerStartType,
    req: IncomingMessage,
    res: ServerResponse
  ) => {
    const { pathname } = parse(req.url ?? "", true);
    let matchFound = false;
    if (!pathname) {
      return routes.errorHandler?.(req, res);
    }
    if (routes && routes.routes && Array.isArray(routes.routes)) {
      routes.routes.forEach((route) => {
        if (typeof route.path === "string") {
          if (
            route.path.split(" ")[0] === req.method &&
            new RegExp(route.path.split(" ")[1]).test(pathname)
          ) {
            matchFound = true;
            route.handler(req, res);
          }
        } else if (
          typeof route.path === "object" &&
          route.path.method === req.method
        ) {
          if (route.path.exact && route.path.path === pathname) {
            matchFound = true;
            route.handler(req, res);
          } else if (
            !route.path.exact &&
            new RegExp(route.path.path).test(pathname)
          ) {
            matchFound = true;
            route.handler(req, res);
          }
        }
      });
    }
    if (!matchFound) {
      routes.notFoundHandler?.(req, res);
    }
  };

  /**
   * the server start listener
   * @param routes route list
   */
  start(routes: ServerStartType) {
    this.httpServer = createServer<
      typeof IncomingMessage,
      typeof ServerResponse
    >((req, res) => this.router(routes, req, res));
    this.httpServer.listen(this.port, this.host, () => {
      console.log(`Server started on ${this.host}:${this.port}`);
    });
  }
  /**
   * return the server instance
   * @returns server
   */
  getServer() {
    return this.httpServer;
  }
}

export type { RequestHandler, HttpMethods, ServerStartType };
