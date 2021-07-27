import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import JoinUsModal from "./JoinUsModal";
import LoginModal from "./LoginModal";

const ModalPage = ({
  cancelButtonRef,
  closeModal,
  open,
  openModalType,
  nameOfModal,
}) => {
  function ShowModal() {
    {
      if (openModalType == "joinusmodal") {
        return <JoinUsModal closeModal={closeModal} />;
      } else if (openModalType == "loginmodal") {
        return <LoginModal closeModal={closeModal} />;
      }
    }
  }

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        static
        open={open}
        onClose={closeModal}
      >
        <div className="max-h-screen h-screen px-8 text-center bg-gray-500 bg-opacity-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full h-4/6 max-w-md p-auto m-auto overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="m-auto">
                <Dialog.Title
                  as="h3"
                  className="font-medium leading-6 text-gray-900 text-center text-4xl  relative"
                >
                  {nameOfModal}
                </Dialog.Title>

                <div className="right-10 float-right absolute top-10">
                  <button
                    onClick={closeModal}
                    type="button"
                    className=" rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                  >
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div>
                  <div>
                    <ShowModal />
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalPage;
