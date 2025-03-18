import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router";
import { ROUTE_LIST } from "./constants";

//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/jedi-on-tauntauns/" element={<App startingTab={0} />}>
          {ROUTE_LIST.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              index={route.tabIndex === 0}
              element={<App startingTab={route.tabIndex} />}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
