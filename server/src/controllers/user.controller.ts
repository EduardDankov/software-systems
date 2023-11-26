import {Request, Response} from "express";
import {QueryArrayConfig, QueryResult} from "pg";
import {db} from "../config/db";

async function getCount(req: Request, res: Response) {
  const dbRes: QueryResult = await db.query('SELECT COUNT(*) FROM users');
  res.status(200).json(dbRes.rows);
}

async function checkCredentials(req: Request, res: Response) {
  const queryString: string = 'SELECT COUNT(*) AS is_data_correct FROM users WHERE email=$1 AND password=$2';
  const dbRes: QueryResult = await db.query(queryString, [req.body.email, req.body.password]);
  res.status(200).json(dbRes.rows);
}

export {
  getCount,
  checkCredentials
};
