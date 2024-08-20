"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectDB_1 = require("./src/config/connectDB");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const post_1 = __importDefault(require("./src/routes/post"));
const users_1 = __importDefault(require("./src/routes/users"));
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("./src/config/cors");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv").config();
const app = (0, express_1.default)();
const PORT = 8080;
(0, connectDB_1.connectDB)();
app.use((0, cors_1.default)(cors_2.corsOption));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/posts", post_1.default);
app.use("/users", users_1.default);
app.all("*", (req, res) => {
    const cType = req.headers["Content-Type"];
    if (cType == "application/json") {
        res.status(404).json({
            message: "404 - Page not found"
        });
    }
    else if (cType == "text/html") {
        res.status(404).send("<h1> 404 - Page not found </h1>");
    }
    else {
        res.status(404).send("404 - Page not Found");
    }
});
mongoose_1.default.connection.once("open", () => {
    console.log("Connected to Mango DB");
    app.listen(PORT, () => {
        console.log(`Server's running on PORT ${PORT}`);
    });
});
