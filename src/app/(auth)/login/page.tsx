"use client";

import React, { useState, useEffect } from "react";
import "./login.css";
import Link from "next/link";
import { loginUser } from "@/store/reducers/userSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/use";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user, status, error } = useAppSelector((state) => state.users);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please enter both username and password.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (status === "succeeded" && user) {
      const userId = user._id;
      localStorage.setItem("userId", userId);
      router.push("/main");
    } else if (status === "failed" && error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
    }

    dispatch(loginUser({ username, password }));
  };

  return (
    <div className="login-body">
      <div className="login-comp">
        <div className="login-form">
          <h3>Log in with your Instagram account</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username, phone, or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div>
              <input
                type={showPassword === true ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="eye"
                onClick={() => {
                  showPassword === true
                    ? setShowPassword(false)
                    : setShowPassword(true);
                }}
              >
                {showPassword === true ? <EyeOff /> : <Eye />}
              </div>
            </div>
            <button
              type="submit"
              className="login-button"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <div className="flex flex-row gap-2 justify-center content-center">
                  <div className="w-2 h-2 rounded-full bg-black animate-pulse"></div>{" "}
                  <div className="w-2 h-2 rounded-full bg-black animate-pulse [animation-delay:-.3s]"></div>{" "}
                  <div className="w-2 h-2 rounded-full bg-black animate-pulse [animation-delay:-.5s]"></div>
                </div>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          <p className="fps">Forgot password?</p>
          <div className="or">
            <hr />
            <p>or</p>
            <hr />
          </div>

          <Link href="/register">
            <div className="insta-login">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
                alt="insta logo"
              />
              <p>Register with Instagram</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                  fill="#a0a4ac"
                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                />
              </svg>
            </div>
          </Link>
        </div>

        <ToastContainer />

        <div className="footer-login">
          <p>© 2024</p>
          <p>Threads Terms</p>
          <p>Privacy Policy</p>
          <p>Cookies Policy</p>
          <p>Report a problem</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
