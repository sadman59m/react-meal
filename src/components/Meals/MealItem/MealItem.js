// import { useContext } from "react";
import { useDispatch } from "react-redux";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
// import CartContext from "../../../store/cart-context";
import { cartActions } from "../../../store/cart-slice";

const MealItem = (props) => {
  // const cartCtx = useContext(CartContext);
  const dispatch = useDispatch();

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    // cartCtx.addItem({
    //   id: props.id,
    //   name: props.name,
    //   amount: amount,
    //   price: props.price,
    // });
    const cartItem = {
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    };
    dispatch(cartActions.addItemToCart(cartItem));
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
