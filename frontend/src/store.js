// src/redux/store.js

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import projectReducer from "./components/Projects/reducer";
import headerReducer from "./components/Header/reducer";
import tasksReducer from "./components/Tasks/reducer";

const rootReducer = combineReducers({
  projects: projectReducer,
  headerReducer: headerReducer,
  tasksReducer: tasksReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
