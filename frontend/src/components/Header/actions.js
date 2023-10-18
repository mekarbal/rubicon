import { SET_SELECTED_BUTTON } from "./constants";

export const setSelectedButton = (selectedButton) => async (dispatch) => {
  console.log(selectedButton);
  dispatch({
    type: SET_SELECTED_BUTTON,
    payload: selectedButton,
  });
};
