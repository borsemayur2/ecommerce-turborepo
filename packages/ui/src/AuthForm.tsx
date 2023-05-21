import React, { useState } from "react";

export function AuthForm({ method, handleSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onClickSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ email, password, name });
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        onSubmit={onClickSubmit}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{ marginBottom: 10 }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{ marginBottom: 10 }}
        />
        {method === "register" && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            style={{ marginBottom: 10 }}
          />
        )}
        <input type="submit" value={method} />
      </form>
    </div>
  );
}
