import { Register_layout } from "@/components/register_layout";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [dataInput, setDataInput] = useState({
    username: "",
    email: "",
    password: "",
    adult: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataInput({ ...dataInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/register", dataInput);
      // console.log("🚀 ~ handleSubmit ~ data:", data);

      Swal.fire({
        icon: "success",
        title: "Register Success",
        text: "Please Login",
      });

      setDataInput({
        username: "",
        email: "",
        password: "",
      });

      navigate("/h");
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      const errMsg = error.response.data.message;
      Swal.fire({
        icon: "error",
        title: errMsg,
        text: "Something went wrong!",
      });
    }
  };

  return (
    <Register_layout
      dataInput={dataInput}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
