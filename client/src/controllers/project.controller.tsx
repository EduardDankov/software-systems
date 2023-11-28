import React from "react";

import {fetchCount} from "./entity.controller.tsx";
import axios, {AxiosResponse} from "axios";
import {Project} from "../models/project";

type ProjectServerData = {
  project_id: number;
  project_name: string;
  project_description: string;
  project_manager_id: number;
  project_manager_username: string;
  project_manager_email: string;
  project_created_at: string;
  project_modified_at: string;
};

async function fetchProjectCount(apiUrl: string, dispatch: React.Dispatch<React.SetStateAction<number>>) {
  await fetchCount(apiUrl, 'project', dispatch);
}

async function fetchProjectData(
  apiUrl: string,
  projectId: number,
  dispatch: React.Dispatch<React.SetStateAction<Array<Project>>>
): Promise<Array<Project>> {
  const projects: Array<Project> = [];
  await axios
    .get(`${apiUrl}/project/data`, { params: {projectId} })
    .then((res: AxiosResponse) => {
      res.data.forEach((project: ProjectServerData) => {
        projects.push({
          id: project.project_id,
          name: project.project_name,
          description: project.project_description,
          manager: {
            id: project.project_manager_id,
            username: project.project_manager_username,
            email: project.project_manager_email
          },
          createdAt: new Date(project.project_created_at),
          modifiedAt: new Date(project.project_modified_at)
        });
      });
      dispatch(projects);
    });
  return projects;
}

async function fetchProjectCreate(
  apiUrl: string,
  name: string,
  description: string,
  managerId: number,
  dispatch: React.Dispatch<React.SetStateAction<number>>
) {
  await axios
    .post(`${apiUrl}/project/create`, {name, description, managerId})
    .then((res: AxiosResponse) => {
      dispatch(+res.data[0].id);
    });
}

async function fetchProjectUpdate(
  apiUrl: string,
  projectId: number,
  field: string,
  value: string | number | boolean
) {
  let result: boolean = false;
  await axios
    .post(`${apiUrl}/project/update`, {projectId, field, value})
    .then((res: AxiosResponse) => {
      result = res.data[0].id === projectId;
    });
  return result;
}

export {
  fetchProjectCount,
  fetchProjectData,
  fetchProjectCreate,
  fetchProjectUpdate
};
