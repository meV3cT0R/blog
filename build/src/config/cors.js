"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOption = exports.allowedOrigins = void 0;
exports.allowedOrigins = ["https://localhost:5173", "https://localhost:3000"];
exports.corsOption = {
    origin: (origin, callback) => {
        if (origin == undefined || exports.allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not Allowed"), false);
        }
    },
    optionsSuccesStatus: 200
};
