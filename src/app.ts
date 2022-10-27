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

app.put("/todo", (req: Request, res: Response) => {
  todoList.map((todo) => {
    if (todo.id == req.body.id) {
      todo.title = req.body.title;
      todo.important = req.body.important;
      return res.send(todo);
    }
  });

  return res.send({
    error: "ToDo id does not exist!"
  });
});

app.delete("/todo", (req: Request, res: Response) => {
  const i = todoList.findIndex((ele) => ele.id == req.body.id);
  todoList.splice(i, 1);
  return res.send(todoList);
});

app.listen(PORT, () => {
  console.log(`App is running on port:${PORT}`);
});
