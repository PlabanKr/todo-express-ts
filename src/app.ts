import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello New Project");
});

app.listen(PORT, () => {
  console.log(`App is running on port:${PORT}`);
});
