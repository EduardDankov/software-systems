import {Request, Response} from "express";
import {QueryResult} from "pg";
import {db} from "../config/db";

async function getCount(req: Request, res: Response) {
  const dbRes: QueryResult = await db.query('SELECT COUNT(*) FROM files');
  res.status(200).json(dbRes.rows);
}

export {
  getCount
};
