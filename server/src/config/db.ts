import dotenv from "dotenv";

import {Client} from "pg";

dotenv.config();

const db = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
void db.connect()
  .catch((err) => {
    console.error(`⚠️ [Database] ${err}`);
  });

export { db };
