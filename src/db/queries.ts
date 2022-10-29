export const getTodosQuery = "SELECT * FROM todos";
export const getTodoById = "SELECT * FROM todos WHERE id = $1";
export const checkTodoExists = "SELECT t FROM todos t WHERE t.name = $1";
export const createTodoQuery =
  "INSERT INTO todos (name, important) VALUES ($1, $2)";
export const deleteTodoQuery = "DELETE FROM todos WHERE id = $1";
export const updateTodoQuery =
  "UPDATE todos SET name = $1, important = $2 WHERE id = $3";
