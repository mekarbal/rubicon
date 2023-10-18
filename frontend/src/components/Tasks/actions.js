import axios from "axios";
import { REQUEST_URL } from "../../utils/constants";
import {
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  GET_TASKS_FAILURE,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
} from "./constants";
import {
  ADD_PROJECT_FAILURE,
  UPDATE_PROJECT_SUCCESS,
} from "../Projects/constants";

//get all Tasks action
export const getTasks = () => async (dispatch) => {
  dispatch({ type: GET_TASKS_REQUEST });

  try {
    const response = await axios.get(REQUEST_URL.TASKS);
    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: response?.data?.tasks,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_TASKS_FAILURE,
      payload: "An error occurred while fetching tasks.",
    });
  }
};
//Delete Task Action
export const deleteTask = (id) => async (dispatch) => {
  dispatch({ type: DELETE_TASK_REQUEST });

  try {
    await axios.delete(`${REQUEST_URL.TASKS}/${id}`);
    dispatch({
      type: DELETE_TASK_SUCCESS,
    });
    dispatch(getTasks());
  } catch (error) {
    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: "An error occurred while fetching tasks.",
    });
  }
};

//add Task action
export const addTask = (task) => async (dispatch) => {
  dispatch({ type: ADD_TASK_REQUEST });
  try {
    await axios.post(REQUEST_URL.TASKS, task);

    dispatch({
      type: ADD_TASK_SUCCESS,
    });
    dispatch(getTasks());
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_PROJECT_FAILURE,
      payload: "An error occurred while fetching tasks.",
    });
  }
};

//update Task action
export const updateTask = (task) => async (dispatch) => {
  dispatch({ type: UPDATE_TASK_REQUEST });
  try {
    await axios.put(`${REQUEST_URL.TASKS}/${task?._id}`, task);
    dispatch({
      type: UPDATE_PROJECT_SUCCESS,
    });
    dispatch(getTasks());
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_TASK_FAILURE,
      payload: "An error occurred while fetching tasks.",
    });
  }
};
