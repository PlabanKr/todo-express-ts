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
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const todo_1 = require("./models/todo");
const app = (0, express_1.default)();
const DB_URL = "mongodb://localhost:27017/todo-express-ts";
const PORT = 3000;
(0, mongoose_1.connect)(DB_URL)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error(err));
// parsing the body (json)
app.use(express_1.default.json());
// parsing the body (urlencoded-formdata)
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.send("Hello New Project");
});
app.get("/todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield todo_1.Todo.find({});
        res.status(200).json(tasks);
    }
    catch (e) {
        res.status(400).json({
            error: e
        });
    }
}));
app.post("/todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = new todo_1.Todo(req.body);
        yield todo.save();
        res.status(201).json(todo);
    }
    catch (e) {
        res.status(400).json({
            error: e
        });
    }
}));
app.put("/todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield todo_1.Todo.findByIdAndUpdate(req.params.id, Object.assign({}, req.body));
        res.status(200).json(todo);
    }
    catch (e) {
        res.status(400).json({
            error: e
        });
    }
}));
app.delete("/todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield todo_1.Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Todo was successfully deleted"
        });
    }
    catch (e) {
        res.status(400).json({
            error: e
        });
    }
}));
app.listen(PORT, () => {
    console.log(`App is running on port:${PORT}`);
});
