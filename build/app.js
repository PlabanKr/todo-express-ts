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
const db_1 = require("./db/db");
const queries_1 = require("./db/queries");
const app = (0, express_1.default)();
const PORT = 3000;
// parsing the body (json)
app.use(express_1.default.json());
// parsing the body (urlencoded-formdata)
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.send("Hello New Project");
});
app.get("/todo", (req, res) => {
    db_1.pool.query(queries_1.getTodosQuery, (error, result) => {
        if (error)
            throw error;
        res.status(200).json(result.rows);
    });
});
app.post("/todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, important } = req.body;
    // check if same todo already exists
    db_1.pool.query(queries_1.checkTodoExists, [name], (error, result) => {
        if (result.rows.length)
            res.status(403).json({ message: "Todo already exists" });
    });
    // add todo to db
    db_1.pool.query(queries_1.createTodoQuery, [name, important], (error, result) => {
        if (error)
            throw error;
        res
            .status(201)
            .json({ message: "Todo created successfully", result: result });
    });
}));
app.put("/todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name, important } = req.body;
    db_1.pool.query(queries_1.getTodoById, [id], (error, result) => {
        if (!result.rows.length)
            return res
                .status(404)
                .json({ message: "Todo was not found in the database" });
        // TODO: Prevent changing name to already existing todo name
        db_1.pool.query(queries_1.updateTodoQuery, [name, important, id], (error, result) => {
            if (error)
                throw error;
            res.status(200).json({ message: "Todo was updated successfully" });
        });
    });
}));
app.delete("/todo/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db_1.pool.query(queries_1.getTodoById, [id], (error, result) => {
        if (!result.rows.length)
            res.status(400).json({ message: "Todo was not found in the database" });
        db_1.pool.query(queries_1.deleteTodoQuery, [id], (error, result) => {
            if (error)
                throw error;
            res.status(200).json({ message: "Todo was deleted successfully" });
        });
    });
});
app.listen(PORT, () => {
    console.log(`App is running on port:${PORT}`);
});
