"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
class Routes {
    route(app) {
        app.route("/")
            .get((req, res) => {
            res.status(200).json({
                message: "Hello World"
            });
        });
    }
}
exports.Routes = Routes;
