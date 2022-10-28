import { Schema, model } from "mongoose";

interface ITodo {
  name: string;
  important: boolean;
}

const todoSchema = new Schema<ITodo>({
  name: { type: String, required: true },
  important: { type: Boolean, required: true }
});

export const Todo = model<ITodo>("Todo", todoSchema);
