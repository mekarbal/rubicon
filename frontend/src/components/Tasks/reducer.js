import {
  ADD_TASK_FAILURE,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  GET_TASKS_FAILURE,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from "./constants";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null,
      };

    case GET_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADD_TASK_SUCCESS:
      return {
        ...state,
      };

    case ADD_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
      };

    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default tasksReducer;
