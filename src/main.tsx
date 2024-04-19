import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App/App";
import Login from "./App/pages/login/Login";
import Signup from "./App/pages/signup/Signup";
import Body from "./App/pages/body/Body";
import Board from "./App/pages/body/board-menu/board/Board";
import MyBoards from "./App/pages/body/board-menu/my-boards/MyBoards";

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
