import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Landing from './Landing.tsx'
import Login from './Login.tsx'
import Signup from './Signup.tsx'
import Requests from "./Requests.tsx";
import ReserveEquipment from "./ReserveEquipment.tsx";
import '../styles/index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "requests",
    element: <Requests />
  },
  {
    path: "home",
    element: <Landing />,
  },
  {
    path: "reserve",
    element: <ReserveEquipment />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);