import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App/App";
import Login from "./App/components/login/Login";
import Signup from "./App/components/signup/Signup";
import Body from "./App/components/body/Body";
import MyBoards from "./App/components/body/my-boards/MyBoards";
import Board from "./App/components/body/my-boards/board/Board";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "/",
        element: <Body />,
        children: [
          {
            path: "/",
            element: <MyBoards />,
          },
          {
            path: "/boards/:id",
            element: <Board />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
