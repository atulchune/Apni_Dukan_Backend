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
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    //   user: DBUSER,
    //   host: DBHOST,
    //   database: DATABASENAME,
    //   password: DBPASSWORD as string,
    //   port: (DBPORT as unknown) as number,
    connectionString: process.env.DBCONNECTION
});
function checkConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield pool.connect(); // Attempt to connect
            console.log('Connected to the database successfully!');
            client.release(); // Release the client back to the pool
        }
        catch (error) {
            console.error('Failed to connect to the database:', error);
        }
    });
}
checkConnection();
exports.default = pool;
