"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session = require("express-session");
const connect_redis_1 = require("connect-redis");
const ioredis_1 = __importDefault(require("ioredis"));
const redisClient = new ioredis_1.default(process.env.REDIS_URL || "redis://127.0.0.1:6379");
if (redisClient) {
    console.log("redis server connected");
}
exports.default = session({
    name: "sid",
    store: new connect_redis_1.RedisStore({ client: redisClient }),
    secret: process.env.sessionSecret || "mysecretsession",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 3,
    },
});
