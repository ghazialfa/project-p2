import { useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import { Home_layout } from "./components/home/home_layout";
import Register from "./pages/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home_layout />,
    },
    {
      path: "/login",
      element: <></>,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      element: <Layout />,
      children: [
        {
          path: "/home",
          element: <></>,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
