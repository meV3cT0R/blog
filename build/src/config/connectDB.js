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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoose = void 0;
const mongoose_1 = require("mongoose");
const connectMongoose = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.DATABASE_URI)
            yield (0, mongoose_1.connect)(process.env.DATABASE_URI);
        else
            throw new Error("Something Horribly went Wrong");
    }
    catch (err) {
        console.error(err);
    }
});
exports.connectMongoose = connectMongoose;
