import { useContext, useRef, useState } from "react";
import Image from "next/image";
import ModalPage from "./Modals/ModalPage";
import { UserContext } from "./Auth/UserProvider";

const nameOfModal = "Join Us";

const Home = () => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef();

  const user = useContext(UserContext);
  function closeModal() {
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }

  return (
    <div>
      <div className="grid md:grid-cols-2  sm:grid-rows-1 py-10">
        <div className="self-center text-center">
          <p className="text-6xl font-semibold ">
            Small Steps <br /> for new <br /> beginning
          </p>

          {!user ? (
            <button
              onClick={openModal}
              type="button"
              className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-3  px-6 m-6 border border-indigo-500 hover:border-transparent rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              Let's Begin
            </button>
          ) : (
            <button
              type="button"
              className="bg-transparent hover:bg-indigo-500 font-semibold hover:text-white py-3  px-6 m-6 border border-indigo-500 hover:border-transparent outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              Hi {user.displayName ? user.displayName : user.email}
            </button>
          )}
          {/* <button
            onClick={openModal}
            className="text-lightBlue-500 bg-transparent border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3  rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Let's Begin
          </button> */}
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            zIndex: -2,
          }}
        >
          <Image
            src="/wall.png"
            alt="Hello"
            width={500}
            height={400}
            style={{ alignItems: "center", justifyContent: "center" }}
          />
        </div>
      </div>
      <ModalPage
        openModal={openModal}
        cancelButtonRef={cancelButtonRef}
        closeModal={closeModal}
        open={open}
        openModalType="joinusmodal"
        nameOfModal={nameOfModal}
      />
    </div>
  );
};

export default Home;
