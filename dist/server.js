"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
const cors_1 = __importDefault(require("cors"));
// import clerkMiddleware from './middleware/clerkMIddleware'
node_path_1.default.dirname("src/assests/");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(express.static("uploads/"))
app.use('/uploads', express_1.default.static('uploads'));
app.use((0, cors_1.default)());
// app.use(clerkMiddleware())
const port = 8000;
app.use("/api", userRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
