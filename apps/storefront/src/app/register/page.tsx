"use client";

import { log } from "logger";
import { AuthForm } from "ui";
import axios from "axios";

export default function Store() {
  log("Hey! This is Home.");
  const handleSubmit = async (_data) => {
    const URL = `http://localhost:${
      process.env.PORT_AUTH || 8001
    }/auth/register`;
    const { data } = await axios.post(URL, _data);
    alert(data.message);
  };

  return (
    <div className="container">
      <h1 className="title">
        Register <br />
        <span></span>
      </h1>
      <AuthForm method="register" handleSubmit={handleSubmit} />
      <p className="description">
        <a href="login">Login</a>
      </p>
    </div>
  );
}
