import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 3000;

// parsing the body (json)
app.use(express.json());
// parsing the body (urlencoded-formdata)
app.use(express.urlencoded({ extended: false }));

interface ToDo {
  id: number;
  title: string;
  important: boolean;
}

const todoList: ToDo[] = [];

app.get("/", (req: Request, res: Response) => {
  res.send("Hello New Project");
});

app.get("/todo", (req: Request, res: Response) => {
  res.send(todoList);
});

app.post("/todo", (req: Request, res: Response) => {
  todoList.push(req.body);
  res.status(201).send("Successfully created todo");
});

app.listen(PORT, () => {
  console.log(`App is running on port:${PORT}`);
});
