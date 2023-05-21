"use client";

import { log } from "logger";
import { useRef } from "react";
import { AuthForm } from "ui";
import axios from "axios";
import { redirect } from "next/navigation";

export default function Store() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (_data) => {
    const URL = `http://localhost:${process.env.PORT_AUTH || 8001}/auth/login`;
    const {
      data: { token, message },
    } = await axios.post(URL, _data);
    alert(message);
    localStorage.setItem("token", token);
    redirect("/products");
  };

  log("Hey! This is Home.");
  return (
    <div className="container">
      <h1 className="title">
        Login <br />
        <span></span>
      </h1>
      <AuthForm method="login" handleSubmit={handleSubmit} />
      <p className="description">
        <a href="register">Register</a>
      </p>
    </div>
  );
}
