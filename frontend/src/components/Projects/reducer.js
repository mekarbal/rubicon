// src/redux/reducers/projectReducer.js

import {
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
} from "./constants";

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
        error: null,
      };

    case GET_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
      };

    case ADD_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
      };

    case UPDATE_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default projectReducer;
