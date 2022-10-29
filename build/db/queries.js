"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoQuery = exports.deleteTodoQuery = exports.createTodoQuery = exports.checkTodoExists = exports.getTodoById = exports.getTodosQuery = void 0;
exports.getTodosQuery = "SELECT * FROM todos";
exports.getTodoById = "SELECT * FROM todos WHERE id = $1";
exports.checkTodoExists = "SELECT t FROM todos t WHERE t.name = $1";
exports.createTodoQuery = "INSERT INTO todos (name, important) VALUES ($1, $2)";
exports.deleteTodoQuery = "DELETE FROM todos WHERE id = $1";
exports.updateTodoQuery = "UPDATE todos SET name = $1, important = $2 WHERE id = $3";
