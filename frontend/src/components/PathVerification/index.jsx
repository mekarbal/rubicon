import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const PathVerfication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedButton } = useSelector((state) => state?.headerReducer);
  const currentUrl = location.pathname;

  console.log("selectedButton", selectedButton, currentUrl);

  useEffect(() => {
    if (selectedButton === "PROJECTS" && currentUrl === "/tasks") {
      navigate("/");
    }
  }, [location, currentUrl]);
  return null;
};

export default PathVerfication;
