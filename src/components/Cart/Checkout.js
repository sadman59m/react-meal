import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isValid = (value) => value.trim() !== "";
const postalValidity = (value) => value.trim().length >= 4;

const Checkout = (props) => {
  const [inputValidity, setInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const inputName = useRef();
  const inputStreet = useRef();
  const inputPostal = useRef();
  const inputCity = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = inputName.current.value;
    const enteredStreet = inputStreet.current.value;
    const enteredPostal = inputPostal.current.value;
    const enteredCity = inputCity.current.value;

    setInputValidity({
      name: isValid(enteredName),
      street: isValid(enteredStreet),
      postal: postalValidity(enteredPostal),
      city: isValid(enteredCity),
    });

    const nameIsValid = isValid(enteredName);
    const streetIsValid = isValid(enteredStreet);
    const postalIsValid = postalValidity(enteredPostal);
    const cityIsValid = isValid(enteredCity);

    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }
    const userData = {
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    };
    props.onConfirm(userData);
  };

  const nameClass = inputValidity.name ? "" : classes.invalid;
  const streetCalss = inputValidity.street ? "" : classes.invalid;
  const postalClass = inputValidity.postal ? "" : classes.invalid;
  const cityClass = inputValidity.city ? "" : classes.invalid;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${nameClass}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={inputName} />
      </div>
      <div className={`${classes.control} ${streetCalss}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={inputStreet} />
      </div>
      <div className={`${classes.control} ${postalClass}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={inputPostal} />
      </div>
      <div className={`${classes.control} ${cityClass}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={inputCity} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
