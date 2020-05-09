export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

import Order from "../../models/order";

export const fetchOrders = () => async (dispatch) => {
  const response = await fetch(
    "https://shopappacademind.firebaseio.com/orders.json"
  );

  const resData = await response.json();

  const orders = [];

  for (const key in resData) {
    const { date, items, totalAmount } = resData[key];

    const currentOrder = new Order(key, items, totalAmount, date);

    orders.push(currentOrder);
  }

  dispatch({
    type: SET_ORDERS,
    orders,
  });
};

export const addToOrder = (cartItems, totalAmount) => async (dispatch) => {
  const date = new Date();

  const response = await fetch(
    "https://shopappacademind.firebaseio.com/orders.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount,
        date,
      }),
    }
  );

  const resData = await response.json();

  dispatch({
    type: ADD_ORDER,
    orderData: {
      id: resData.name,
      cartItems,
      totalAmount,
      date,
    },
  });
};
