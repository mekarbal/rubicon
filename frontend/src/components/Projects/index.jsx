import React, { useEffect, useState } from "react";
import {
  addProject,
  deleteProject,
  getProjects,
  updateProject,
} from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Table } from "react-bootstrap";
import { formatDate } from "../../utils/constants";
import CircumIcon from "@klarr-agency/circum-icons-react";
import "./index.scss";
import CustomModal from "../shared/CustomModal";
const ProjectsComponent = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.projects);

  const [modalOpen, setModalOpen] = useState(false);
  const [updatedProject, setUpdatedProject] = useState({});
  const [modalTitle, setModalTitle] = useState("");
  const openCreateModal = () => {
    setModalOpen(true);
    setModalTitle("Add Project");
  };
  const openUpdateModal = (project) => {
    setModalOpen(true);
    setModalTitle("Update Project");
    setUpdatedProject(project);
  };
  const closeModal = () => {
    setModalOpen(false);
    setUpdatedProject({});
  };

  const handleAddProject = (formData) => {
    dispatch(addProject(formData));
  };

  const deleteProjectAction = (id) => {
    dispatch(deleteProject(id));
  };
  const updateProjectAction = (project) => {
    dispatch(updateProject(project));
  };
  const projectFields = [
    {
      name: "label",
      label: "Label*",
      type: "text",
      value: updatedProject?.label || "",
      required: true,
    },
    {
      name: "description",
      label: "Description*",
      type: "text",
      value: updatedProject?.description || "",
      required: true,
    },

    {
      name: "starting_date",
      label: "Started At*",
      type: "date",
      value: updatedProject?.starting_date || "",
      required: true,
    },
    {
      name: "ending_date",
      label: "Ended At*",
      type: "date",
      value: updatedProject?.ending_date || "",
      required: true,
    },
  ];

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  const handler = (formData) => {
    Object.keys(updatedProject).length === 0
      ? handleAddProject(formData)
      : updateProjectAction(formData);
  };
  console.log("updatedProject", updatedProject);
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
        Add Project
      </Button>

      <Table borderless>
        <thead>
          <tr>
            <th className="no-border">Label</th>
            <th className="no-border">Description</th>
            <th className="no-border">StartedAt</th>
            <th className="no-border">EndAt</th>
            <th className="no-border">CreatedAt</th>
            <th className="no-border">UpdatedAt</th>
            <th className="no-border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects?.length === 0 && <h6>There is no project yet.</h6>}
          {projects?.length !== 0 &&
            projects?.map((project, index) => (
              <tr key={index} className="table_row">
                <td>{project?.label}</td>
                <td className="description">{project?.description}</td>
                <td>
                  <div className="calendar_date">
                    <CircumIcon name="calendar" size={24} />
                    {formatDate(project?.starting_date)}
                  </div>
                </td>
                <td>
                  <div className="calendar_date">
                    <CircumIcon name="calendar" size={24} />
                    {formatDate(project?.ending_date)}
                  </div>
                </td>
                <td>
                  <div className="createdAt_date">
                    {formatDate(project?.createdAt)}
                  </div>
                </td>
                <td>
                  <div className="updateddAt_date">
                    {formatDate(project?.updatedAt)}
                  </div>
                </td>
                <td>
                  <div className="actions_buttons">
                    <div
                      className="action_button"
                      onClick={() => openUpdateModal(project)}>
                      <CircumIcon name="edit" size={24} color={"#7e26d8"} />
                    </div>
                    <div
                      onClick={() => deleteProjectAction(project?._id)}
                      style={{ marginLeft: 7 }}
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
        fields={projectFields}
        dataValues={updatedProject}
        isForProjects={true}
      />
    </Container>
  );
};

export default ProjectsComponent;
