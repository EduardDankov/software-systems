import {useNavigate, useParams} from "react-router-dom";
import {FieldValues, useForm} from "react-hook-form";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";

import {fetchTaskData, fetchTaskUpdate} from "../../../../controllers/task.controller";
import {fetchProjectData} from "../../../../controllers/project.controller";
import {fetchUserData} from "../../../../controllers/user.controller";
import {TaskTable} from "../../../../components/TaskTable";
import {User} from "../../../../models/user";
import {Project} from "../../../../models/project";
import {Task} from "../../../../models/task";

function TaskEdit() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [users, setUsers] = useState<Array<User>>([]);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({ mode: "onChange" });

  const userData: User = JSON.parse(sessionStorage.getItem("userData") || "{}");
  const {taskId} = useParams();

  if (taskId === undefined || +taskId < 1) {
    navigate('/task');
  }

  const updateTaskList = async () => {
    await Promise.all([
      fetchTaskData('/api/v1', +taskId!, setTasks),
      fetchProjectData('/api/v1', -1, setProjects),
      fetchUserData('/api/v1', -1, setUsers)
    ]).then(() => setIsDataLoaded(true));
  };

  Promise.all([
    updateTaskList()
  ]).then(() => setIsDataLoaded(true));

  useEffect(() => {
    if (isDataChanged) {
      navigate(`/task/${taskId}`)
    }
  }, [isDataChanged]);

  const changeData = async (data: FieldValues) => {
    if (!userData.id || (tasks[0].assignee.id !== userData.id && tasks[0].project.manager.id !== userData.id)) {
      window.reportError(new Error("You cannot edit this project."));
    } else {
      if (tasks[0].name !== data?.taskName) {
        await fetchTaskUpdate('/api/v1', +taskId!, 'task_name', data?.taskName)
          .then((res: boolean) => {
            if (res) {
              setIsDataChanged(true);
            }
          });
      }
      if (tasks[0].description !== data?.taskDescription) {
        await fetchTaskUpdate('/api/v1', +taskId!, 'task_description', data?.taskDescription)
          .then((res: boolean) => {
            if (res) {
              setIsDataChanged(true);
            }
          });
      }
      if (tasks[0].priority !== data?.taskPriority) {
        await fetchTaskUpdate('/api/v1', +taskId!, 'task_priority', data?.taskPriority)
          .then((res: boolean) => {
            if (res) {
              setIsDataChanged(true);
            }
          });
      }
      if (tasks[0].status !== data?.taskStatus) {
        await fetchTaskUpdate('/api/v1', +taskId!, 'task_status', data?.taskStatus)
          .then((res: boolean) => {
            if (res) {
              setIsDataChanged(true);
            }
          });
      }
      if (isDataLoaded) {
        if (tasks[0].project.id !== data?.taskProject) {
          await fetchTaskUpdate('/api/v1', +taskId!, 'project_id', data?.taskProject)
            .then((res: boolean) => {
              if (res) {
                setIsDataChanged(true);
              }
            });
        }
        if (tasks[0].assignee.id !== data?.taskAssignee) {
          await fetchTaskUpdate('/api/v1', +taskId!, 'assignee_id', data?.taskAssignee)
            .then((res: boolean) => {
              if (res) {
                setIsDataChanged(true);
              }
            });
        }
      }
      const datetime = new Date(`${data?.taskDeadlineDate}T${data?.taskDeadlineTime}Z`);
      if (tasks[0].deadline !== datetime) {
        await fetchTaskUpdate('/api/v1', +taskId!, 'task_deadline', datetime.toISOString())
          .then((res: boolean) => {
            if (res) {
              setIsDataChanged(true);
            }
          });
      }
    }
  }

  return(
    <div className="task-edit">
      <Container className="container-md">
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            {
              tasks.map(task =>
                <Form key={taskId} onSubmit={handleSubmit(changeData)}>
                  <h1 className="page-title">Edit Task #{taskId}</h1>
                  {
                    isDataChanged
                      ? <p className="text-success">Data changed successfully.</p>
                      : <p className="text-muted">
                        You can change the task data if necessary.
                      </p>
                  }
                  <Form.Group className="mb-3" controlId="controlTaskName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Untitled"
                      defaultValue={task.name}
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
                      placeholder="A description"
                      defaultValue={task.description}
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
                      placeholder={TaskTable.taskPriority[task.priority]}
                      defaultValue={task.priority}
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
                  <Form.Group className="mb-3" controlId="controlTaskPriority">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      placeholder={TaskTable.taskStatus[task.status]}
                      defaultValue={task.status}
                      { ...register("taskStatus") }
                    >
                      {
                        TaskTable.taskStatus.map((status, index) =>
                          <option key={index} value={index}>{status}</option>
                        )
                      }
                    </Form.Select>
                    {
                      <Form.Text className="text-muted">
                        The task status helps to understand how far did the task completion gone.
                      </Form.Text>
                    }
                  </Form.Group>
                  {
                    isDataLoaded
                    ? <>
                        <Form.Group className="mb-3" controlId="controlTaskProject">
                          <Form.Label>Project</Form.Label>
                          <Form.Select
                            placeholder={task.project.name}
                            defaultValue={task.project.id}
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
                            defaultValue={task.assignee.id}
                            { ...register("taskAssignee") }
                          >
                            {
                              users.map((user) =>
                                <option key={user.id} value={user.id}>{user.username}</option>
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
                    : <></>
                  }
                  <Form.Group className="mb-3" controlId="controlTaskDeadline">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder={task.deadline.toISOString()}
                      defaultValue={task.deadline.toISOString().split('T')[0]}
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
                      placeholder={task.deadline.toISOString()}
                      defaultValue={task.deadline.toISOString().split('T')[1].split('.')[0]}
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
                  <Button variant="primary" type="submit">Save</Button>
                  <Button variant="secondary" onClick={() => navigate(`/task/${taskId}`)}>Back</Button>
                </Form>
              )
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export {TaskEdit};
