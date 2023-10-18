import React, { useEffect, useState } from "react";
import { addTask, deleteTask, getTasks, updateTask } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Table } from "react-bootstrap";
import { formatDate } from "../../utils/constants";
import CircumIcon from "@klarr-agency/circum-icons-react";
import CustomModal from "../shared/CustomModal";
const TasksComponent = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasksReducer);
  const { projects } = useSelector((state) => state.projects);
  const [modalOpen, setModalOpen] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({});
  const [modalTitle, setModalTitle] = useState("");
  const taskFields = [
    {
      name: "label",
      label: "Label*",
      type: "text",
      value: updatedTask?.label || "",
      required: true,
    },
    {
      name: "description",
      label: "Description*",
      type: "text",
      value: updatedTask?.description || "",
      required: true,
    },
    {
      name: "project",
      label: "Project*",
      type: "select",
      value: updatedTask?.project || "",
      required: true,
      options: projects,
    },
    {
      name: "starting_date",
      label: "Started At*",
      type: "date",
      value: updatedTask?.starting_date || "",
      required: true,
    },
    {
      name: "ending_date",
      label: "Ended At*",
      type: "date",
      value: updatedTask?.ending_date || "",
      required: true,
    },
  ];
  const openCreateModal = () => {
    setModalOpen(true);
    setModalTitle("Add Task");
  };
  const openUpdateModal = (task) => {
    setModalOpen(true);
    setModalTitle("Update Task");
    setUpdatedTask(task);
  };
  const closeModal = () => {
    setModalOpen(false);
    setUpdatedTask({});
  };
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  const deleteTaskAction = (id) => {
    console.log(id);
    dispatch(deleteTask(id));
  };
  const handleAddTask = (formData) => {
    dispatch(addTask(formData));
  };

  const updateTaskAction = (task) => {
    dispatch(updateTask(task));
  };
  const handler = (formData) => {
    Object.keys(updatedTask).length === 0
      ? handleAddTask(formData)
      : updateTaskAction(formData);
  };
  return (
    <Container>
      {loading && "loading................."}

      <Button
        onClick={openCreateModal}
        variant="outline"
        className="add_project_button">
        <ion-icon
          name="add"
          style={{ fontSize: "23px", marginRight: 3 }}></ion-icon>
        Add Task
      </Button>
      <Table borderless>
        <thead>
          <tr>
            <th className="no-border">Label</th>
            <th className="no-border">Description</th>
            <th className="no-border">Project</th>
            <th className="no-border">StartedAt</th>
            <th className="no-border">EndAt</th>
            <th className="no-border">CreatedAt</th>
            <th className="no-border">UpdatedAt</th>
            <th className="no-border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.length === 0 && <h6>There is no task yet.</h6>}
          {tasks?.length !== 0 &&
            tasks?.map((task, index) => (
              <tr key={index} className="table_row">
                <td>{task?.label}</td>
                <td className="description">{task?.description}</td>
                <td>{task?.project?.label}</td>
                <td>
                  <div className="calendar_date">
                    <CircumIcon name="calendar" size={24} />
                    {formatDate(task?.starting_date)}
                  </div>
                </td>
                <td>
                  <div className="calendar_date">
                    <CircumIcon name="calendar" size={24} />
                    {formatDate(task?.ending_date)}
                  </div>
                </td>
                <td>
                  <div className="createdAt_date">
                    {formatDate(task?.starting_date)}
                  </div>
                </td>
                <td>
                  <div className="updateddAt_date">
                    {formatDate(task?.ending_date)}
                  </div>
                </td>
                <td>
                  <div className="actions_buttons">
                    <div
                      className="action_button"
                      style={{ marginRight: 7 }}
                      onClick={() => openUpdateModal(task)}>
                      <CircumIcon name="edit" size={24} color={"#7e26d8"} />
                    </div>
                    <div
                      onClick={() => deleteTaskAction(task?._id)}
                      className="action_button">
                      <CircumIcon name="trash" size={24} color={"#7e26d8"} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <CustomModal
        show={modalOpen}
        onHide={closeModal}
        onAddOrUpdate={handler}
        title={modalTitle}
        fields={taskFields}
        dataValues={updatedTask}
        isForProjects={false}
      />
    </Container>
  );
};

export default TasksComponent;
