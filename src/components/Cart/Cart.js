import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";
import Loading from "../UI/Loading";
import { cartActions } from "../../store/cart-slice";

const Cart = (props) => {
  // const cartCtx = useContext(CartContext);
  const dispatch = useDispatch();
  const reduxCartItems = useSelector((state) => state.cart.items);
  const reduxtotalAmount = useSelector((state) => state.cart.totalAmount);
  reduxtotalAmount.toFixed(2);
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderIsProcessign, setOrderIsProcessing] = useState(false);
  const [orederConfirmed, setOrderConfirmed] = useState(false);

  console.log(reduxCartItems);

  // const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  // const hasItems = cartCtx.items.length > 0;
  const hasItems = reduxCartItems.length > 0;

  const cartItemRemoveHandler = (id) => {
    // cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    // cartCtx.addItem({ ...item, amount: 1 });
    const cartItem = {
      ...item,
      amount: 1,
    };
    console.log(cartItem);
    // dispatch(cartActions.addItemToCart(cartItem));
  };

  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  const checkoutCancelHandler = () => {
    setIsCheckout(false);
  };

  const orderConfirmHandler = async (userData) => {
    // console.log(userData);
    // const orderData = {
    //   items: cartCtx.items,
    //   totalAmount: cartCtx.totalAmount,
    //   user: userData,
    // };
    // if (userData && orderData) {
    //   setOrderIsProcessing(true);
    //   await fetch(
    //     "https://react-http-b9988-default-rtdb.firebaseio.com/orders.json",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(orderData),
    //     }
    //   );
    // }
    // setOrderIsProcessing(false);
    // setOrderConfirmed(true);
    // cartCtx.clearItems();
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

  const cartActions = (
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
      {!isCheckout && cartActions}
    </React.Fragment>
  );

  const orderProcessingContent = <Loading content="Processing" />;
  const orderComfirmedContent = (
    <React.Fragment>
      <p>Order Confirmed!</p>
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
