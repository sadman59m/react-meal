import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const [btnHighlighted, setBtnHighlighted] = useState(false);

  const numberOfCartItems = cartItems.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClass = `${classes.button} ${btnHighlighted ? classes.bump : ""}`;
  useEffect(() => {
    if (cartItems.length > 0) {
      setBtnHighlighted(true);
    }
    const x = setTimeout(() => {
      setBtnHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(x);
    };
  }, [cartItems]);

  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
