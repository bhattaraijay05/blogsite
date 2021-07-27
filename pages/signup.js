import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { MagicSpinner, RotateSpinner } from "react-spinners-kit";
import { UserContext } from "../components/Auth/UserProvider";
import {
  auth,
  generateUserDocument,
  signInWithGoogle,
} from "../components/Firebase/firebase";
const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      setSpinner(true);
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, { displayName });
      setEmail("");
      setPassword("");
      setDisplayName("");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setSpinner(false);
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <>
      <Head>
        <title>Signup</title>
        <meta name="description" content="Signup" />
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
        <div className="mt-2 w-3/5 sm:w-2/5">
          {error !== null && (
            <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
              {error}
            </div>
          )}
          <form>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Full Name
              </div>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                name="displayName"
                value={displayName}
                placeholder="Full Name"
                id="displayName"
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
            <div className="text-sm mt-3 font-bold text-gray-700 tracking-wide">
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
            <div className="mt-3">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Password
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
                  createUserWithEmailAndPasswordHandler(event, email, password);
                }}
                type="button"
                className="bg-indigo-500 text-gray-100 p-2 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="mt-2 mx-auto">
          <button
            onClick={() => {
              signInWithGoogle();
              setSpinner(true);
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
              Sign Up with Google
            </div>
          </button>
        </div>

        {spinner && <RotateSpinner size={40} color="indigo" loading={true} />}

        <div className="mt-4">
          <p>
            Already have an account?
            <Link href="/login">
              <button className="text-indigo-900 font-semibold text-lg focus:outline-none">
                Sign in
              </button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default signup;
