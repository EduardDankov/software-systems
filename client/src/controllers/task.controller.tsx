import React from "react";
import axios, {AxiosResponse} from "axios";

import {fetchCount} from "./entity.controller";
import {Task, TaskPriority, TaskStatus} from "../models/task";

type TaskServerData = {
  task_id: number;
  task_name: string;
  task_description: string;
  task_priority: TaskPriority;
  task_status: TaskStatus;
  task_project_id: number;
  task_project_name: string;
  task_project_description: string;
  task_project_manager_id: number;
  task_project_manager_username: string;
  task_project_manager_email: string;
  task_project_created_at: string;
  task_project_modified_at: string;
  task_assignee_id: number;
  task_assignee_username: string;
  task_assignee_email: string;
  task_created_at: string;
  task_modified_at: string;
  task_deadline: string;
};

async function fetchTaskCount(apiUrl: string, dispatch: React.Dispatch<React.SetStateAction<number>>) {
  await fetchCount(apiUrl, 'task', dispatch);
}

async function fetchTaskData(
  apiUrl: string,
  taskId: number,
  dispatch: React.Dispatch<React.SetStateAction<Array<Task>>>
): Promise<Array<Task>> {
  const tasks: Array<Task> = [];
  await axios
    .get(`${apiUrl}/task/data`, { params: {taskId} })
    .then((res: AxiosResponse) => {
      res.data.forEach((task: TaskServerData) => {
        tasks.push({
          id: task.task_id,
          name: task.task_name,
          description: task.task_description,
          priority: task.task_priority,
          status: task.task_status,
          project: {
            id: task.task_project_id,
            name: task.task_project_name,
            description: task.task_project_description,
            manager: {
              id: task.task_project_manager_id,
              username: task.task_project_manager_username,
              email: task.task_project_manager_email
            },
            createdAt: new Date(task.task_project_created_at),
            modifiedAt: new Date(task.task_project_modified_at)
          },
          assignee: {
            id: task.task_assignee_id,
            username: task.task_assignee_username,
            email: task.task_assignee_email
          },
          createdAt: new Date(task.task_created_at),
          modifiedAt: new Date(task.task_modified_at),
          deadline: new Date(task.task_deadline)
        });
      });
      dispatch(tasks);
    });
  return tasks;
}

async function fetchTaskDataByProject(
  apiUrl: string,
  projectId: number,
  dispatch: React.Dispatch<React.SetStateAction<Array<Task>>>
): Promise<Array<Task>> {
  const tasks: Array<Task> = [];
  await axios
    .get(`${apiUrl}/task/data-by-project`, { params: {projectId} })
    .then((res: AxiosResponse) => {
      res.data.forEach((task: TaskServerData) => {
        tasks.push({
          id: task.task_id,
          name: task.task_name,
          description: task.task_description,
          priority: task.task_priority,
          status: task.task_status,
          project: {
            id: task.task_project_id,
            name: task.task_project_name,
            description: task.task_project_description,
            manager: {
              id: task.task_project_manager_id,
              username: task.task_project_manager_username,
              email: task.task_project_manager_email
            },
            createdAt: new Date(task.task_project_created_at),
            modifiedAt: new Date(task.task_project_modified_at)
          },
          assignee: {
            id: task.task_assignee_id,
            username: task.task_assignee_username,
            email: task.task_assignee_email
          },
          createdAt: new Date(task.task_created_at),
          modifiedAt: new Date(task.task_modified_at),
          deadline: new Date(task.task_deadline)
        });
      });
      dispatch(tasks);
    });
  return tasks;
}

async function fetchTaskCreate(
  apiUrl: string,
  name: string,
  description: string,
  priority: TaskPriority,
  projectId: number,
  assigneeId: number,
  deadline: Date,
  dispatch: React.Dispatch<React.SetStateAction<number>>
) {
  await axios
    .post(`${apiUrl}/task/create`, {name, description, priority, projectId, assigneeId, deadline})
    .then((res: AxiosResponse) => {
      dispatch(+res.data[0].id);
    });
}

async function fetchTaskUpdate(
  apiUrl: string,
  taskId: number,
  field: string,
  value: string | number | boolean
) {
  let result: boolean = false;
  await axios
    .post(`${apiUrl}/task/update`, {taskId, field, value})
    .then((res: AxiosResponse) => {
      result = res.data[0].id === taskId;
    });
  return result;
}

async function fetchTaskDelete(
  apiUrl: string,
  taskId: number
) {
  let result: boolean = false;
  await axios
    .post(`${apiUrl}/task/delete`, {taskId})
    .then((res: AxiosResponse) => {
      result = res.data[0].id === taskId;
    });
  return result;
}

export {
  fetchTaskCount,
  fetchTaskData,
  fetchTaskDataByProject,
  fetchTaskCreate,
  fetchTaskUpdate,
  fetchTaskDelete
};
