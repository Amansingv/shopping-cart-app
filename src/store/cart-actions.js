import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        "https://redux-http-130f4-default-rtdb.firebaseio.com/cartitems.json"
      );
      const data = await res.json();

      return data;
    };
    try {
      const cartData = await fetchHandler();

      cartData.itemsList && dispatch(cartActions.replaceData(cartData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request to Fetch Data Failed",
          type: "error",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "Sending Request",
        type: "warning",
      })
    );

    const sendRequest = async () => {
      // send state as sending request

      const res = await fetch(
        "https://redux-http-130f4-default-rtdb.firebaseio.com/cartitems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      // send state as request is successful
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sent Request to Database Successfully",
          type: "success",
        })
      );
    };
    try {
      await sendRequest();
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request failed",
          type: "error",
        })
      );
    }
  };
};
