import {Request, Response} from "express";
import {QueryResult} from "pg";
import {db} from "../config/db";

async function getCount(req: Request, res: Response) {
  const dbRes: QueryResult = await db.query('SELECT COUNT(*) FROM tasks');
  res.status(200).json(dbRes.rows);
}

async function getTaskData(req: Request, res: Response) {
  const queryString: string = `
      SELECT
        tasks.task_id AS task_id,
        tasks.task_name AS task_name,
        tasks.task_description AS task_description,
        tasks.task_priority AS task_priority,
        tasks.task_status AS task_status,
        projects.project_id AS task_project_id,
        projects.project_name AS task_project_name,
        projects.project_description AS task_project_description,
        users1.user_id AS task_project_manager_id,
        users1.username AS task_project_manager_username,
        users1.email AS task_project_manager_email,
        projects.project_created_at AS task_project_created_at,
        projects.project_modified_at AS task_project_modified_at,
        users2.user_id AS task_assignee_id,
        users2.username AS task_assignee_username,
        users2.email AS task_assignee_email,
        tasks.task_created_at AS task_created_at,
        tasks.task_modified_at AS task_modified_at,
        tasks.task_deadline AS task_deadline
      FROM
        tasks
      JOIN projects ON tasks.project_id = projects.project_id
      JOIN users AS users1 ON projects.project_manager_id = users1.user_id
      JOIN users AS users2 ON tasks.assignee_id = users2.user_id
      ${+req.query.taskId! !== -1 ? `WHERE task_id=$1` : ''}
  `;
  const queryData: Array<any> = +req.query.taskId! !== -1 ? [+req.query.taskId!] : [];
  const dbRes: QueryResult = await db.query(queryString, queryData);
  res.status(200).json(dbRes.rows);
}

async function getTaskDataByProject(req: Request, res: Response) {
  const queryString: string = `
      SELECT
        tasks.task_id AS task_id,
        tasks.task_name AS task_name,
        tasks.task_description AS task_description,
        tasks.task_priority AS task_priority,
        tasks.task_status AS task_status,
        projects.project_id AS task_project_id,
        projects.project_name AS task_project_name,
        projects.project_description AS task_project_description,
        users1.user_id AS task_project_manager_id,
        users1.username AS task_project_manager_username,
        users1.email AS task_project_manager_email,
        projects.project_created_at AS task_project_created_at,
        projects.project_modified_at AS task_project_modified_at,
        users2.user_id AS task_assignee_id,
        users2.username AS task_assignee_username,
        users2.email AS task_assignee_email,
        tasks.task_created_at AS task_created_at,
        tasks.task_modified_at AS task_modified_at,
        tasks.task_deadline AS task_deadline
      FROM
        tasks
      JOIN projects ON tasks.project_id = projects.project_id
      JOIN users AS users1 ON projects.project_manager_id = users1.user_id
      JOIN users AS users2 ON tasks.assignee_id = users2.user_id
      ${+req.query.projectId! !== -1 ? `WHERE tasks.project_id=$1` : ''}
  `;
  const queryData: Array<any> = +req.query.projectId! !== -1 ? [+req.query.projectId!] : [];
  const dbRes: QueryResult = await db.query(queryString, queryData);
  res.status(200).json(dbRes.rows);
}

async function insertTaskData(req: Request, res: Response) {
  const queryString: string = `
    INSERT INTO tasks (
      task_name, 
      task_description, 
      task_priority,
      project_id
      assignee_id,
      task_deadline
    ) VALUES ($1, $2, $3) 
    RETURNING task_id AS id
  `;
  const queryValues = [
    req.body.name,
    req.body.description,
    req.body.priority,
    req.body.projectId,
    req.body.assigneeId,
    req.body.deadline
  ];
  const dbRes: QueryResult = await db.query(queryString, queryValues);
  res.status(200).json(dbRes.rows);
}

async function updateTaskData(req: Request, res: Response) {
  const queryString: string = `
    UPDATE tasks 
    SET ${req.body.field}=$1, task_modified_at=CURRENT_TIMESTAMP 
    WHERE task_id=$2 
    RETURNING task_id AS id
  `;
  const dbRes: QueryResult = await db.query(queryString, [req.body.value, req.body.taskId]);
  res.status(200).json(dbRes.rows);
}

export {
  getCount,
  getTaskData,
  getTaskDataByProject,
  insertTaskData,
  updateTaskData
};
