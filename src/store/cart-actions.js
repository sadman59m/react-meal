import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-b9988-default-rtdb.firebaseio.com/carts.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();
      console.log(data);
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalAmount: cartData.totalAmount,
        })
      );
    } catch (error) {
      console.log("fetching failed");
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      console.log("sending cart data");
      const response = await fetch(
        "https://react-http-b9988-default-rtdb.firebaseio.com/carts.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalAmount: cart.totalAmount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log("sending cart data failed");
    }
  };
};
