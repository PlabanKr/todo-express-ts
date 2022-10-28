import express, { Application, Request, Response } from "express";
import { connect } from "mongoose";
import { Todo } from "./models/todo";

const app: Application = express();
const DB_URL = "mongodb://localhost:27017/todo-express-ts";
const PORT = 3000;

connect(DB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err));

// parsing the body (json)
app.use(express.json());
// parsing the body (urlencoded-formdata)
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello New Project");
});

app.get("/todo", async (req: Request, res: Response) => {
  try {
    const tasks = await Todo.find({});
    res.status(200).json(tasks);
  } catch (e) {
    res.status(400).json({
      error: e
    });
  }
});

app.post("/todo", async (req: Request, res: Response) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json(todo);
  } catch (e) {
    res.status(400).json({
      error: e
    });
  }
});

app.put("/todo/:id", async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, { ...req.body });
    res.status(200).json(todo);
  } catch (e) {
    res.status(400).json({
      error: e
    });
  }
});

app.delete("/todo/:id", async (req: Request, res: Response) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Todo was successfully deleted"
    });
  } catch (e) {
    res.status(400).json({
      error: e
    });
  }
});

app.listen(PORT, () => {
  console.log(`App is running on port:${PORT}`);
});
