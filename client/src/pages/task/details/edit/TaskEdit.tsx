import {useNavigate, useParams} from "react-router-dom";
import {FieldValues, useForm} from "react-hook-form";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";

import {fetchTaskData, fetchTaskUpdate} from "../../../../controllers/task.controller";
import {User} from "../../../../models/user";
import {Task} from "../../../../models/task";

function TaskEdit() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [isDataChanged, setIsDataChanged] = useState(false);
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
    await fetchTaskData('/api/v1', +taskId!, setTasks);
  };

  useEffect(() => {
    void updateTaskList();
  }, []);

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
