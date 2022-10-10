"use strict";
var http_1 = require("http");
var url_1 = require("url");
var ApiRouter = /** @class */ (function () {
    function ApiRouter(port, host) {
        /**
         * configures the router
         * @param routes routes
         * @param req request
         * @param res response
         * @returns
         */
        this.router = function (routes, req, res) {
            var _a, _b, _c;
            var pathname = (0, url_1.parse)((_a = req.url) !== null && _a !== void 0 ? _a : "", true).pathname;
            var matchFound = false;
            if (!pathname) {
                return (_b = routes.errorHandler) === null || _b === void 0 ? void 0 : _b.call(routes, req, res);
            }
            if (routes && routes.routes && Array.isArray(routes.routes)) {
                routes.routes.forEach(function (route) {
                    if (typeof route.path === "string") {
                        if (route.path.split(" ")[0] === req.method &&
                            new RegExp(route.path.split(" ")[1]).test(pathname)) {
                            matchFound = true;
                            route.handler(req, res);
                        }
                    }
                    else if (typeof route.path === "object" &&
                        route.path.method === req.method) {
                        if (route.path.exact && route.path.path === pathname) {
                            matchFound = true;
                            route.handler(req, res);
                        }
                        else if (!route.path.exact &&
                            new RegExp(route.path.path).test(pathname)) {
                            matchFound = true;
                            route.handler(req, res);
                        }
                    }
                });
            }
            if (!matchFound) {
                (_c = routes.notFoundHandler) === null || _c === void 0 ? void 0 : _c.call(routes, req, res);
            }
        };
        this.port = port;
        this.host = host;
    }
    /**
     * the server start listener
     * @param routes route list
     */
    ApiRouter.prototype.start = function (routes) {
        var _this = this;
        this.httpServer = (0, http_1.createServer)(function (req, res) { return _this.router(routes, req, res); });
        this.httpServer.listen(this.port, this.host, function () {
            console.log("Server started on ".concat(_this.host, ":").concat(_this.port));
        });
    };
    /**
     * return the server instance
     * @returns server
     */
    ApiRouter.prototype.getServer = function () {
        return this.httpServer;
    };
    return ApiRouter;
}());
module.exports = ApiRouter;
