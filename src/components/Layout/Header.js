import { Fragment } from "react";

import classes from "./Header.module.css";
import mealImg from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>
      <div className={classes["header-img"]}>
        <img src={mealImg} alt="table full of foods" />
      </div>
    </Fragment>
  );
};

export default Header;
