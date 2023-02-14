import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartProvider";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement("#root");

const CheckoutModal = ({ modalIsOpen, setIsOpen, sendDataObj }) => {
  const { setTotal, setCart, sendAmount } = useContext(CartContext);
  const navigate = useNavigate();

  let subtitle;

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  //submitting the checkout form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    sendData();
  };

  //sending checkout data to server
  const sendData = () => {
    // e.preventDefault();
    try {
      axios
        .post(
          "https://grandma-bakery-server.up.railway.app/cartAllData",
          sendDataObj
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    } finally {
      clearCartData();
      sendAmount(0);
    }
  };

  //clearing cart data
  const clearCartData = () => {
    axios
      .get("https://grandma-bakery-server.up.railway.app/clearCartData")
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setCart([]);
    setTotal(0);
    closeModal();
    navigate("/checkout");
  };

  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Checkout Modal"
        shouldCloseOnOverlayClick={false}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-lg font-semibold text-gray-900"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 block p-2.5 w-72 md:w-96 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-400 dark:focus:border-yellow-400"
            />
            {errors.email && <span>This field is required</span>}
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block mb-2 text-lg font-semibold text-gray-900"
            >
              Address
            </label>
            <input
              {...register("address", { required: true })}
              type="address"
              id="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 block p-2.5 w-72 md:w-96 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-400 dark:focus:border-yellow-400"
            />
            {errors.address && <span>Please add right address</span>}
          </div>

          <div className="flex justify-between">
            <button
              onClick={closeModal}
              className="text-white bg-yellow-400 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-400 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-400 dark:hover:bg-yellow-400 dark:focus:ring-yellow-400"
            >
              close
            </button>
            <button
              type="submit"
              className="text-white bg-yellow-400 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-400 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-400 dark:hover:bg-yellow-400 dark:focus:ring-yellow-400"
            >
              Checkout
            </button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
};

export default CheckoutModal;
