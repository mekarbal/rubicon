import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./index.scss";
import { formatDateString } from "../../../utils/constants";
const CustomModal = ({
  show,
  onHide,
  onAddOrUpdate,
  title,
  fields,
  dataValues,
  isForProjects,
}) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    const isFormDataEmpty = Object.values(formData).every(
      (value) => value.trim() === ""
    );

    if (isFormDataEmpty) {
      return;
    }
    onAddOrUpdate(formData);
    onHide();
  };
  useEffect(() => {
    if (dataValues) {
      setFormData(dataValues);
    }
  }, [dataValues, fields]);
  return (
    <Modal show={show} onHide={onHide}>
      <div className="modal_header">
        <div className="header_content">
          <ion-icon
            name="flag"
            style={{ fontSize: "29px", marginRight: 8 }}></ion-icon>
          <div>
            <h5 className="add_new_text">{title}</h5>
            <h6 className="fill_attributes">
              Fill Your {isForProjects ? "project" : "tasks"} attributes
            </h6>
          </div>
        </div>
        <div>
          <ion-icon
            name="close"
            style={{ fontSize: "29px", cursor: "pointer" }}
            onClick={onHide}></ion-icon>
        </div>
      </div>

      <Modal.Body>
        <Form>
          {fields.map((field) => (
            <Form.Group key={field.name}>
              <Form.Label className="form_label">{field.label}</Form.Label>
              {field?.name === "description" ? (
                <Form.Control
                  type={field.type}
                  name={field.name}
                  as="textarea"
                  rows={4}
                  value={formData[field?.name]}
                  onChange={handleInputChange}
                />
              ) : field?.name === "project" ? (
                <Form.Control
                  as="select"
                  name="project"
                  value={formData["project"]}
                  onChange={handleInputChange}
                  required={field.required}>
                  <option value="">Select a project</option>
                  {field.options?.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.label}
                    </option>
                  ))}
                </Form.Control>
              ) : (
                <Form.Control
                  type={field.type}
                  name={field.name}
                  value={
                    field?.name === "starting_date" ||
                    field?.name === "ending_date"
                      ? formatDateString(formData[field?.name])
                      : formData[field?.name]
                  }
                  onChange={handleInputChange}
                />
              )}
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline" className="cancel_button " onClick={onHide}>
          Cancel
        </Button>
        <Button variant="outline" className="save_button" onClick={handleAdd}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
