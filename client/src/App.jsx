import { useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import { Home_layout } from "./components/home/home_layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home_layout />,
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
