import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App/App";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import Board from "./body/board/Board";
import Body from "./body/Body";
import MyBoards from "./body/my-boards/MyBoards";

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
