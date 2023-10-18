// src/redux/reducers/projectReducer.js

import { SET_SELECTED_BUTTON } from "./constants";

const initialState = {
  selectedButton: "PROJECTS",
};

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_BUTTON:
      return {
        ...state,
        selectedButton: action?.payload,
      };

    default:
      return state;
  }
};

export default headerReducer;
