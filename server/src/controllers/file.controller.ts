import {Request, Response} from "express";
import {QueryResult} from "pg";
import {db} from "../config/db";

async function getCount(req: Request, res: Response) {
  const dbRes: QueryResult = await db.query('SELECT COUNT(*) FROM files');
  res.send(dbRes.rows[0].count);
}

export {
  getCount
};
