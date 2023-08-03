import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import Loading from "../UI/Loading";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://react-http-b9988-default-rtdb.firebaseio.com/meals"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const fetchedMeals = [];
      for (let key in data) {
        fetchedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(fetchedMeals);
      setIsLoading(false);
    };
    getMeals().catch((err) => {
      setError(err.message);
    });
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content;

  if (isLoading) {
    content = (
      <section className={classes.content}>
        <Loading />
      </section>
    );
  }
  // if (error) {
  //   content = (
  //     <p className={`${classes.content} ${classes.error}`}>
  //       Somethig went wrong! Try again later.
  //     </p>
  //   );
  // }

  return (
    <section className={classes.meals}>
      <Card>
        {!isLoading && !error && <ul>{mealsList}</ul>}
        {content}
      </Card>
    </section>
  );
};

export default AvailableMeals;
