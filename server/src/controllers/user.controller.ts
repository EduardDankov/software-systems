import {Request, Response} from "express";
import {QueryArrayConfig, QueryResult} from "pg";
import {db} from "../config/db";

async function getCount(req: Request, res: Response) {
  const dbRes: QueryResult = await db.query('SELECT COUNT(*) FROM users');
  res.status(200).json(dbRes.rows);
}

async function checkIsEmailTaken(req: Request, res: Response) {
  const queryString: string = 'SELECT COUNT(*) AS is_email_taken FROM users WHERE email=$1';
  const dbRes: QueryResult = await db.query(queryString, [req.query.email]);
  res.status(200).json(dbRes.rows);
}

async function checkCredentials(req: Request, res: Response) {
  const queryString: string = 'SELECT COUNT(*) AS is_data_correct FROM users WHERE email=$1 AND password=$2';
  const dbRes: QueryResult = await db.query(queryString, [req.body.email, req.body.password]);
  res.status(200).json(dbRes.rows);
}

async function insertCredentials(req: Request, res: Response) {
  const queryString: string =
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id AS id";
  const dbRes: QueryResult = await db.query(queryString, [req.body.username, req.body.email, req.body.password]);
  res.status(200).json(dbRes.rows);
}

export {
  getCount,
  checkIsEmailTaken,
  checkCredentials,
  insertCredentials
};
