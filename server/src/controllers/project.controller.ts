import {Request, Response} from "express";
import {QueryResult} from "pg";
import {db} from "../config/db";

async function getCount(req: Request, res: Response) {
  const dbRes: QueryResult = await db.query('SELECT COUNT(*) FROM projects');
  res.status(200).json(dbRes.rows);
}

async function getProjectData(req: Request, res: Response) {
  const queryString: string = `
      SELECT 
        project_id, 
        project_name, 
        project_description, 
        project_created_at, 
        project_modified_at, 
        project_manager_id, 
        users.username AS project_manager_username, 
        users.email AS project_manager_email
      FROM projects
      LEFT JOIN users
        ON users.user_id = project_manager_id
      ${+req.query.projectId! !== -1 ? `WHERE project_id=$1` : ''}
  `;
  const queryData: Array<any> = +req.query.projectId! !== -1 ? [+req.query.projectId!] : [];
  const dbRes: QueryResult = await db.query(queryString, queryData);
  res.status(200).json(dbRes.rows);
}

async function insertProjectData(req: Request, res: Response) {
  const queryString: string = `
    INSERT INTO projects (
      project_name, 
      project_description, 
      project_manager_id
    ) VALUES ($1, $2, $3) 
    RETURNING project_id AS id
  `;
  const dbRes: QueryResult =
    await db.query(queryString, [req.body.name, req.body.description, req.body.managerId]);
  res.status(200).json(dbRes.rows);
}

async function updateProjectData(req: Request, res: Response) {
  const queryString: string = `
    UPDATE projects 
    SET ${req.body.field}=$1, project_modified_at=CURRENT_TIMESTAMP 
    WHERE project_id=$2 
    RETURNING project_id AS id
  `;
  const dbRes: QueryResult = await db.query(queryString, [req.body.value, req.body.projectId]);
  res.status(200).json(dbRes.rows);
}

async function deleteProjectData(req: Request, res: Response) {
  const queryString: string = `
    DELETE FROM projects 
    WHERE project_id=$1 
    RETURNING project_id AS id
  `;
  const dbRes: QueryResult = await db.query(queryString, [req.body.projectId]);
  res.status(200).json(dbRes.rows);
}

export {
  getCount,
  getProjectData,
  insertProjectData,
  updateProjectData,
  deleteProjectData
};
