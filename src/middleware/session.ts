import session = require("express-session")
import { RedisStore } from "connect-redis"
import IORedis from "ioredis";

declare module 'express-session' {
  interface SessionData {
    clientId?: string;
    email?: string;
    userid?:number;
    name?:string
  }
}

const redisClient = new IORedis(process.env.REDIS_URL || "redis://127.0.0.1:6379");
if(redisClient){
  console.log("redis server connected");
}

export default session({
      name:"sid",
        store: new RedisStore({client:redisClient}) ,
        secret: process.env.sessionSecret || "mysecretsession",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 3,
        },
    })

    