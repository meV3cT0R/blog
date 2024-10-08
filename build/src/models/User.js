"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    posts: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Post"
        }],
    liked: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Post"
        }],
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        default: ""
    }
});
exports.User = mongoose_1.default.model("User", UserSchema);
