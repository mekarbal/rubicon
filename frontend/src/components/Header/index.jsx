import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedButton } from "./actions";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedButton } = useSelector((state) => state?.headerReducer);

  const switchButtonAtion = (selectedAction) => {
    dispatch(setSelectedButton(selectedAction));
    switch (selectedAction) {
      case "PROJECTS":
        navigate("/");
        break;
      case "TASKS":
        navigate("/tasks");
        break;
      default:
        break;
    }
  };
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container>
      <div className="coding_challenge_container">
        <h1 className="coding_challenge_title">Rubicon Coding Challenge</h1>
      </div>
      <div className="switch_buttons">
        <Button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            backgroundColor:
              selectedButton === "PROJECTS" ? "#7e26d8" : "transparent",
            color: selectedButton === "PROJECTS" ? "white" : "#7e26d8",
          }}
          variant="outline"
          onClick={() => switchButtonAtion("PROJECTS")}
          className="switch_button">
          Projects
        </Button>
        <Button
          style={{
            backgroundColor:
              selectedButton !== "PROJECTS" ? "#7e26d8" : "transparent",
            color: selectedButton !== "PROJECTS" ? "white" : "#7e26d8",
          }}
          variant="outline"
          onClick={() => switchButtonAtion("TASKS")}
          className="switch_button">
          Tasks
        </Button>
      </div>
    </Container>
  );
};

export default Header;
