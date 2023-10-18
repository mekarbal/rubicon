import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectsComponent from "./components/Projects";
import TasksComponent from "./components/Tasks";
import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import Header from "./components/Header";
import PathVerfication from "./components/PathVerification";
function App() {
  const routes = [
    {
      path: "/",
      component: <ProjectsComponent />,
    },
    {
      path: "/tasks",
      component: <TasksComponent />,
    },
  ];

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <PathVerfication />
        <Routes>
          {routes?.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
