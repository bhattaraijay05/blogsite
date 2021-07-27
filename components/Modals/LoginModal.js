import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { auth, signInWithGoogle } from "../Firebase/firebase";

const login = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="mt-20"
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}

        <div className="mt-2" style={{ width: "80%" }}>
          <div>
            <div className="text-sm font-bold text-gray-700 tracking-wide">
              Email Address
            </div>
            <input
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="email"
              name="userEmail"
              value={email}
              placeholder="yourname@example.com"
              id="userEmail"
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
          <div className="mt-3">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Password
              </div>
              <div>
                <Link href="/forgetpassword">
                  <button
                    type="button"
                    className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                  cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </Link>
              </div>
            </div>
            <input
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              name="userPassword"
              value={password}
              placeholder="Your Password"
              id="userPassword"
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
          <div className="mt-4">
            <button
              onClick={(event) => {
                signInWithEmailAndPasswordHandler(event, email, password);
              }}
              type="button"
              className="bg-indigo-500 text-gray-100 p-2 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
            >
              Log In
            </button>
          </div>
        </div>
        <div className="mt-2 mx-auto">
          <button
            onClick={() => {
              signInWithGoogle();
            }}
            type="button"
            style={{
              width: 280,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1  m-2 border border-blue-500 hover:border-transparent rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            <div
              style={{
                flex: 0.1,
                alignItems: "flex-end",
                zIndex: 3,
              }}
            >
              <img src="/google.png" alt="Google" />
            </div>
            <div
              style={{
                flex: 0.7,
              }}
            >
              Login with Google
            </div>
          </button>
        </div>

        <div className="mt-4">
          <p>
            Don't have an account?{" "}
            <Link href="/signup">
              <button
                onClick={() => closeModal()}
                className="text-indigo-900 font-semibold text-lg focus:outline-none"
              >
                Sign up
              </button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default login;
