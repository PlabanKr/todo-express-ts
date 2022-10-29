import express, { Application, Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "./db/db";
import {
  getTodosQuery,
  getTodoById,
  checkTodoExists,
  createTodoQuery,
  deleteTodoQuery,
  updateTodoQuery
} from "./db/queries";

const app: Application = express();
const PORT = 3000;

// parsing the body (json)
app.use(express.json());
// parsing the body (urlencoded-formdata)
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello New Project");
});

app.get("/todo", (req: Request, res: Response) => {
  pool.query(getTodosQuery, (error, result: QueryResult) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
});

app.post("/todo", async (req: Request, res: Response) => {
  const { name, important } = req.body;
  // check if same todo already exists
  pool.query(checkTodoExists, [name], (error, result: QueryResult) => {
    if (result.rows.length)
      res.status(403).json({ message: "Todo already exists" });
  });

  // add todo to db
  pool.query(
    createTodoQuery,
    [name, important],
    (error, result: QueryResult) => {
      if (error) throw error;
      res
        .status(201)
        .json({ message: "Todo created successfully", result: result });
    }
  );
});

app.put("/todo/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, important } = req.body;

  pool.query(getTodoById, [id], (error, result: QueryResult) => {
    if (!result.rows.length)
      return res
        .status(404)
        .json({ message: "Todo was not found in the database" });

    // TODO: Prevent changing name to already existing todo name
    pool.query(
      updateTodoQuery,
      [name, important, id],
      (error, result: QueryResult) => {
        if (error) throw error;
        res.status(200).json({ message: "Todo was updated successfully" });
      }
    );
  });
});

app.delete("/todo/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  pool.query(getTodoById, [id], (error, result: QueryResult) => {
    if (!result.rows.length)
      res.status(400).json({ message: "Todo was not found in the database" });

    pool.query(deleteTodoQuery, [id], (error, result: QueryResult) => {
      if (error) throw error;
      res.status(200).json({ message: "Todo was deleted successfully" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port:${PORT}`);
});
