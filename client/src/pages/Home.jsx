import { Home_layout } from "@/components/home/home_layout";
import React, { useEffect } from "react";
import { api } from "../../utils/axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  // const dispatch = useDispatch();
  // const genres = useSelector((state) => state.genres.list);

  // useEffect(() => {
  //   dispatch(fetchgenres());
  // }, []);

  return <Home_layout />;
}
