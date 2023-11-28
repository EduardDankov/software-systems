import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {FieldValues, useForm} from "react-hook-form";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

import {Project} from "../../../models/project";
import {User} from "../../../models/user";
import {fetchTaskCreate} from "../../../controllers/task.controller";
import {fetchProjectData} from "../../../controllers/project.controller";
import {fetchUserData} from "../../../controllers/user.controller";
import {TaskTable} from "../../../components/TaskTable";
import {Menu} from "../../../components/Menu";

function TaskCreate() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [users, setUsers] = useState<Array<User>>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [taskId, setTaskId] = useState(-1);
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({ mode: "onChange" });

  const userData: User = JSON.parse(sessionStorage.getItem("userData") || "{}");

  const updateLists = async () => {
    await Promise.all([
      fetchProjectData('/api/v1', -1, setProjects),
      fetchUserData('/api/v1', -1, setUsers)
    ]).then(() => setIsDataLoaded(true));
  };

  Promise.all([
    updateLists()
  ]).then(() => setIsDataLoaded(true));

  const handleCreation = async (data: FieldValues) => {
    console.log(data, userData, projects, projects.filter(project => project.manager.id === userData.id))
    if (!userData.id || !projects.filter(project => project.manager.id === userData.id)) {
      window.reportError(new Error("You have to log in as a project manager to create a task."));
    } else {
      await fetchTaskCreate(
        '/api/v1',
        data?.taskName,
        data?.taskDescription,
        data?.taskPriority,
        data?.taskProject,
        data?.taskAssignee,
        new Date(`${data?.taskDeadlineDate}T${data?.taskDeadlineTime}Z`),
        setTaskId
      );
    }
  }

  useEffect(() => {
    if (taskId !== -1) {
      navigate(`/task`);
    }
  }, [taskId]);

  return(
    <div className="task-edit">
      <Menu />
      <Container className="container-md">
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            <Form key={taskId} onSubmit={handleSubmit(handleCreation)}>
              <h1 className="page-title">Create a task</h1>
              <Form.Group className="mb-3" controlId="controlTaskName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name your task"
                  { ...register("taskName", {required: true}) }
                  aria-invalid={errors.taskName ? "true" : undefined}
                />
                {
                  errors.taskName
                    ? (
                      errors.taskName.type === "required"
                      && <Form.Text className="text-danger">This field is required.</Form.Text>
                    )
                    : <Form.Text className="text-muted">
                      The task name is used to identify it in the project.
                    </Form.Text>
                }
              </Form.Group>
              <Form.Group className="mb-3" controlId="controlTaskDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Describe your task"
                  { ...register("taskDescription", {required: true}) }
                  aria-invalid={errors.taskDescription ? "true" : undefined}
                />
                {
                  errors.taskDescription
                    ? (
                      errors.taskDescription.type === "required"
                      && <Form.Text className="text-danger">This field is required.</Form.Text>
                    )
                    : <Form.Text className="text-muted">
                      The task description helps to understand the purpose of the task.
                    </Form.Text>
                }
              </Form.Group>
              <Form.Group className="mb-3" controlId="controlTaskPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  placeholder="Pick a priority"
                  defaultValue={1}
                  { ...register("taskPriority", {required: true}) }
                >
                  {
                    TaskTable.taskPriority.map((priority, index) =>
                      <option key={index} value={index}>{priority}</option>
                    )
                  }
                </Form.Select>
                {
                  errors.taskPriority
                    ? (
                      errors.taskPriority.type === "required"
                      && <Form.Text className="text-danger">This field is required.</Form.Text>
                    )
                    : <Form.Text className="text-muted">
                      The task priority helps to understand which tasks have to be completed earlier.
                    </Form.Text>
                }
              </Form.Group>
              {
                isDataLoaded
                  ? <>
                    <Form.Group className="mb-3" controlId="controlTaskProject">
                      <Form.Label>Project</Form.Label>
                      <Form.Select
                        placeholder="Pick a project"
                        { ...register("taskProject") }
                      >
                        {
                          projects.map((project) =>
                            <option key={project.id} value={project.id}>{project.name}</option>
                          )
                        }
                      </Form.Select>
                      {
                        <Form.Text className="text-muted">
                          The task project helps to understand which global goal it makes closer.
                        </Form.Text>
                      }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="controlTaskAssignee">
                      <Form.Label>Assignee</Form.Label>
                      <Form.Select
                        placeholder="Pick an assignee"
                        { ...register("taskAssignee") }
                      >
                        {
                          users.map((user) =>
                            <option key={user.id} value={user.id}>{user.username} &lt;{user.email}&gt;</option>
                          )
                        }
                      </Form.Select>
                      {
                        <Form.Text className="text-muted">
                          The task assignee is a person who is responsible for task completion.
                        </Form.Text>
                      }
                    </Form.Group>
                  </>
                  : <>Loading...</>
              }
              <Form.Group className="mb-3" controlId="controlTaskDeadline">
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={new Date(Date.now() + 28 * 86400).toISOString().split('T')[0]}
                  { ...register("taskDeadlineDate", {required: true}) }
                  aria-invalid={errors.taskDeadlineDate ? "true" : undefined}
                />
                {
                  errors.taskDeadlineDate
                    ? (
                      errors.taskDeadlineDate.type === "required"
                      && <Form.Text className="text-danger">This field is required.</Form.Text>
                    )
                    : <></>
                }
                <Form.Control
                  type="time"
                  step="any"
                  defaultValue={new Date().toISOString().split('T')[1].split('.')[0]}
                  { ...register("taskDeadlineTime", {required: true}) }
                  aria-invalid={errors.taskDeadlineTime ? "true" : undefined}
                />
                {
                  errors.taskDeadlineTime
                    ? (
                      errors.taskDeadlineTime.type === "required"
                      && <Form.Text className="text-danger">This field is required.</Form.Text>
                    )
                    : <Form.Text className="text-muted">
                      The task deadline defines the timestamp, until when the task must be completed.
                    </Form.Text>
                }
              </Form.Group>
              <Button variant="primary" type="submit">Create</Button>
              <Button variant="secondary" onClick={() => navigate(`/task`)}>Back</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export {TaskCreate};
