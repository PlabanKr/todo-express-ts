"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    important: { type: Boolean, required: true }
});
exports.Todo = (0, mongoose_1.model)("Todo", todoSchema);
