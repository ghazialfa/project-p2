import { useState } from "react";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import { Home_layout } from "./components/home/home_layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import { store } from "./store";
import Movies from "./pages/Movies";
import Popular from "./pages/Popular";
import Genres from "./pages/Genres";
import Favorites from "./pages/Favorites";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home_layout />,
    },
    {
      path: "/login",
      element: <Login />,
      loader: () => {
        return localStorage.token ? redirect("/h") : null;
      },
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      element: <Layout />,
      loader: () => {
        return localStorage.token ? null : redirect("/login");
      },
      children: [
        {
          path: "/h",
          element: <Movies />,
        },
        {
          path: "/popular",
          element: <Popular />,
        },
        {
          path: "/genres/:id",
          element: <Genres />,
        },
        {
          path: "/favorites",
          element: <Favorites />,
        },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
