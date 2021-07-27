import Link from "next/link";
import { signInWithGoogle } from "../Firebase/firebase";

const JoinUsModal = ({ closeModal }) => {
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
      <div className="mt-2 mx-auto">
        <button
          type="button"
          onClick={() => {
            signInWithGoogle();
            closeModal();
          }}
          style={{
            width: 280,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-1  m-2 border border-indigo-500 hover:border-transparent rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          <div
            style={{
              flex: 0.1,
              alignItems: "flex-end",
              zIndex: 3,
            }}
          >
            <img
              src="/google.png"
              alt="Google"
              // style={{ width: 35, height: 35 }}
            />
          </div>
          <div
            style={{
              flex: 0.7,
            }}
          >
            Join with Google
          </div>
        </button>
        {/* <button
          type="button"
          style={{
            width: 280,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-1  m-2 border border-indigo-500 hover:border-transparent rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          <div
            style={{
              flex: 0.1,
              alignItems: "flex-end",
              zIndex: 3,
            }}
          >
            <img
              src="/facebook.png"
              alt="Facebook"
            />
          </div>
          <div
            style={{
              flex: 0.7,
            }}
          >
            Join with Facebook
          </div>
        </button> */}

        <Link href="/signup">
          <button
            onClick={() => closeModal()}
            style={{
              width: 280,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-1  m-2 border border-indigo-500 hover:border-transparent rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            <div
              style={{
                flex: 0.1,
                alignItems: "flex-end",
                zIndex: 3,
              }}
            >
              <img
                src="/email.png"
                alt="Email"
                // style={{ width: 35, height: 35 }}
              />
            </div>
            <div
              style={{
                flex: 0.7,
              }}
            >
              Join with Email
            </div>
          </button>
        </Link>
      </div>

      <div className="mt-4">
        <p>
          Already have an account?{" "}
          <Link href="/login">
            <button
              onClick={() => closeModal()}
              className="text-indigo-900 font-semibold text-lg focus:outline-none"
            >
              Sign in
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default JoinUsModal;
