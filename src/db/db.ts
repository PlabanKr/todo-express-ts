import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo_express_ts",
  password: process.env.DB_PASS,
  port: 5432
});
