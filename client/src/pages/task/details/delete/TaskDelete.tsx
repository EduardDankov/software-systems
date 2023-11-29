import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";

import {Task} from "../../../../models/task.tsx";
import {User} from "../../../../models/user.tsx";
import {fetchTaskData, fetchTaskDelete} from "../../../../controllers/task.controller.tsx";
import {Menu} from "../../../../components/Menu.tsx";

function TaskDelete() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [isTaskDeleted, setIsTaskDeleted] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);const {
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
      fetchTaskData('/api/v1', +taskId!, setTasks)
    ]).then(() => setIsDataLoaded(true));
  };

  Promise.all([
    updateTaskList()
  ]).then(() => setIsDataLoaded(true));

  useEffect(() => {
    if (isTaskDeleted) {
      navigate(`/task`)
    }
  }, [isTaskDeleted]);

  const deleteTask = async () => {
    if (!userData.id || tasks[0].project.manager.id !== userData.id) {
      window.reportError(new Error("You cannot delete this task."));
    } else {
      await fetchTaskDelete('/api/v1', +taskId!)
        .then((res: boolean) => {
          if (res) {
            setIsTaskDeleted(true);
          }
        });
    }
  }

  return (
    <div className="task-delete">
      <Menu />
      <Container className="container-md">
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            {
              isDataLoaded
                ? tasks.map(task =>
                  <Form key={taskId} onSubmit={handleSubmit(deleteTask)}>
                    <h1 className="page-title">Delete Task #{taskId}</h1>
                    {
                      isTaskDeleted
                        ? <p className="text-success">Task deleted successfully.</p>
                        : <p className="text-muted">
                          You can delete the task if necessary.
                          Be careful, this action is not reversible!
                          You might want to <Link to={`/task/${taskId}/edit`}>
                            change task's status
                        </Link> as Completed or Canceled instead.
                        </p>
                    }
                    <Form.Group className="mb-3" controlId="controlTaskName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Task Name"
                        { ...register("taskName", {
                            required: true,
                            validate: (value) => value === task.name
                          })}
                        aria-invalid={errors.taskName ? "true" : undefined}
                      />
                      {
                        errors.taskName
                          ? (
                            errors.taskName.type === "required"
                            ? <Form.Text className="text-danger">This field is required.</Form.Text>
                            : errors.taskName.type === "validate"
                            && <Form.Text className="text-danger">
                                The entered value is not equal to task's name.
                               </Form.Text>
                          )
                          : <Form.Text className="text-muted">
                              Enter the task name to confirm its deletion.
                            </Form.Text>
                      }
                    </Form.Group>
                    <Button variant="danger" type="submit">Delete</Button>
                    <Button variant="secondary" onClick={() => navigate(`/task/${taskId}`)}>Back</Button>
                  </Form>
                )
                : <>Loading...</>
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export {TaskDelete};
