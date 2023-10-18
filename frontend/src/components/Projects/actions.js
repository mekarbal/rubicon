import axios from "axios";
import {
  ADD_PROJECT_FAILURE,
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  GET_PROJECTS_FAILURE,
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
} from "./constants";
import { REQUEST_URL } from "../../utils/constants";

//get all projects action
export const getProjects = () => async (dispatch) => {
  dispatch({ type: GET_PROJECTS_REQUEST });

  try {
    const response = await axios.get(REQUEST_URL.PROJECTS);
    dispatch({
      type: GET_PROJECTS_SUCCESS,
      payload: response?.data?.projects,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_PROJECTS_FAILURE,
      payload: "An error occurred while fetching projects.",
    });
  }
};

//Delete Project Action
export const deleteProject = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PROJECT_REQUEST });

  try {
    await axios.delete(`${REQUEST_URL.PROJECTS}/${id}`);
    dispatch({
      type: DELETE_PROJECT_SUCCESS,
    });
    dispatch(getProjects());
  } catch (error) {
    dispatch({
      type: DELETE_PROJECT_FAILURE,
      payload: "An error occurred while fetching projects.",
    });
  }
};

//add project action
export const addProject = (project) => async (dispatch) => {
  dispatch({ type: ADD_PROJECT_REQUEST });
  try {
    await axios.post(REQUEST_URL.PROJECTS, project);

    dispatch({
      type: ADD_PROJECT_SUCCESS,
    });
    dispatch(getProjects());
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_PROJECT_FAILURE,
      payload: "An error occurred while fetching projects.",
    });
  }
};

//update project action
export const updateProject = (project) => async (dispatch) => {
  dispatch({ type: UPDATE_PROJECT_REQUEST });
  try {
    const response = await axios.put(
      `${REQUEST_URL.PROJECTS}/${project?._id}`,
      project
    );
    console.log(`${REQUEST_URL.PROJECTS}/${project?._id}`, project, response);
    dispatch({
      type: UPDATE_PROJECT_SUCCESS,
    });
    dispatch(getProjects());
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_PROJECT_FAILURE,
      payload: "An error occurred while fetching projects.",
    });
  }
};
