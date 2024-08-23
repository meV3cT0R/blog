"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const connectDB_1 = require("./config/connectDB");
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
class App {
    constructor(router) {
        this.router = router;
        this.app = (0, express_1.default)();
        this.mongoose = mongoose_1.default;
        this.connectDB();
        this.config();
        this.app.use(this.router);
    }
    config() {
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
    }
    start(port) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise(resolve => {
                this.mongoose.connection.once("open", () => {
                    console.log('Connected To Mongo DB');
                    this.app.listen(port, () => {
                        console.log(`Server Started on port : ${port}`);
                    });
                });
                resolve();
            });
        });
    }
    connectDB() {
        (0, connectDB_1.connectMongoose)().catch((err) => {
            if (err instanceof Error) {
                console.error(err.message);
            }
            console.error(err);
            process.exit(1);
        });
    }
}
exports.App = App;
