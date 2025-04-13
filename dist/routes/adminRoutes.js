"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = __importDefault(require("../controllers/adminController"));
const upload_1 = __importDefault(require("../middleware/upload"));
const adminRoutes = (0, express_1.Router)();
const adminController = new adminController_1.default();
adminRoutes.post("/upload_product", upload_1.default.array("files", 5), adminController.uploadProductData);
exports.default = adminRoutes;
