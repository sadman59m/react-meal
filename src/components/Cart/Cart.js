import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { cartActions } from "../../store/cart-slice";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";
import Loading from "../UI/Loading";

const Cart = (props) => {
  // const cartCtx = useContext(CartContext);
  const dispatch = useDispatch();
  const reduxCartItems = useSelector((state) => state.cart.items);
  const reduxtotalAmount = useSelector((state) =>
    state.cart.totalAmount.toFixed(2)
  );
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderIsProcessign, setOrderIsProcessing] = useState(false);
  const [orederConfirmed, setOrderConfirmed] = useState(false);

  const hasItems = reduxCartItems.length > 0;

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const cartItemAddHandler = (item) => {
    const cartItem = {
      ...item,
      amount: 1,
    };
    dispatch(cartActions.addItemToCart(cartItem));
  };

  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  const checkoutCancelHandler = () => {
    setIsCheckout(false);
  };

  const orderConfirmHandler = async (userData) => {
    console.log(userData);
    const orderData = {
      items: reduxCartItems,
      totalAmount: reduxtotalAmount,
      user: userData,
    };
    if (userData && orderData) {
      setOrderIsProcessing(true);
      await fetch(
        "https://react-http-b9988-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );
    }
    setOrderIsProcessing(false);
    setOrderConfirmed(true);
    dispatch(cartActions.resetCart());
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {reduxCartItems.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler}
        />
      ))}
    </ul>
  );

  const cartComponentAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartMoalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${reduxtotalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={orderConfirmHandler}
          onCancel={checkoutCancelHandler}
        />
      )}
      {!isCheckout && cartComponentAction}
    </React.Fragment>
  );

  const orderProcessingContent = <Loading content="Processing" />;
  const orderComfirmedContent = (
    <React.Fragment>
      <p className={classes.confirm}>Order Confirmed!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!orderIsProcessign && !orederConfirmed && cartMoalContent}
      {orderIsProcessign && orderProcessingContent}
      {!orderIsProcessign && orederConfirmed && orderComfirmedContent}
    </Modal>
  );
};

export default Cart;
