"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

const AuthForm = () => {
  const router = useRouter();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isLogin ? "/api/auth/login" : "/api/auth/register";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      localStorage.setItem("@library/token", data.token);
      auth.setToken(data.token);
      router.push("/items");
      return;
    }
    setError("Invalid login credentials");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form_group">
          <label className="form_label">Email</label>
          <input
            className="form_input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="form_group">
          <label className="form-label">Password</label>
          <input
            className="form_input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        {!isLogin && (
          <div className="form_group">
            <label className="form_label">Name</label>
            <input
              className="form_input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
        )}
        {error && <p>{error}</p>}
        <div className="form_group">
          <button
            className="form_button"
            type="button"
            onClick={(e) => {
              setIsLogin(!isLogin);
            }}
          >
            {!isLogin ? "Login" : "Register"}
          </button>
          <button type="submit" className="auth-submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
