import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import React, { useContext } from "react";
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

  //sending checkout data to server
  const sendData = (e) => {
    e.preventDefault();
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
        contentLabel="Example Modal"
      >
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="johndoe@email.com"
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="address" value="Your address" />
            </div>
            <TextInput
              id="address"
              type="text"
              placeholder="Your address"
              required={true}
            />
          </div>
          <Button color="warning" onClick={sendData}>
            Checkout
          </Button>
          <Button color="warning" onClick={closeModal}>
            Close
          </Button>
        </form>
      </ReactModal>
    </div>
  );
};

export default CheckoutModal;
