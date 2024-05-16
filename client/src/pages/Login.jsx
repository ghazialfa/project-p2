import { Login_layout } from "@/components/login_layout";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../utils/axios";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const [dataInput, setDataInput] = useState({
    emailOrUsername: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataInput({ ...dataInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/login", dataInput);
      // console.log("🚀 ~ handleSubmit ~ data:", data);

      setDataInput({
        emailOrUsername: "",
        password: "",
      });

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("userId", data.user.id);
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
    <Login_layout
      dataInput={dataInput}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
