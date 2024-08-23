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
exports.dec = exports.User = exports.Post = void 0;
const Post_1 = require("../models/Post");
const User_1 = require("../models/User");
exports.Post = Post_1.DPost;
exports.User = User_1.DUser;
const dec = (func) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return yield func(req, res);
    });
};
exports.dec = dec;
