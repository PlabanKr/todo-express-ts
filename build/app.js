"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
// parsing the body (json)
app.use(express_1.default.json());
// parsing the body (urlencoded-formdata)
app.use(express_1.default.urlencoded({ extended: false }));
const todoList = [];
app.get("/", (req, res) => {
    res.send("Hello New Project");
});
app.get("/todo", (req, res) => {
    res.send(todoList);
});
app.post("/todo", (req, res) => {
    todoList.push(req.body);
    res.status(201).send("Successfully create todo");
});
app.listen(PORT, () => {
    console.log(`App is running on port:${PORT}`);
});
