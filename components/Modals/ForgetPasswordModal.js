import React, { useState } from "react";
import { Link } from "next/link";
import { auth } from "../Firebase/firebase";

const ForgetPasswordModal = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };
  const sendResetEmail = (event) => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {
          setEmailHasBeenSent(false);
        }, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
      });
  };

  return (
    <div
      className="mt-20"
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="mt-2" style={{ width: "80%" }}>
        {emailHasBeenSent && (
          <div className="py-3 bg-green-400 w-full text-white text-center mb-3">
            An email has been sent to you!
          </div>
        )}
        {error !== null && (
          <div className="py-3 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <div>
          <div className="text-sm font-bold text-gray-700 tracking-wide">
            Enter your email
          </div>
          <input
            className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            type="email"
            name="userEmail"
            id="userEmail"
            value={email}
            placeholder="Input your email"
            onChange={onChangeHandler}
          />
        </div>
        <div className="mt-4">
          <button
            disabled={disabled}
            onClick={sendResetEmail}
            type="button"
            className="bg-indigo-500 text-gray-100 p-2 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
          >
            Get Reset Link
          </button>
        </div>
        <Link
          to="/login"
          className="my-2 text-blue-700 hover:text-blue-800 text-center block"
        >
          &larr; back to sign in page
        </Link>
      </div>
    </div>
  );
};

export default ForgetPasswordModal;
