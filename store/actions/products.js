import Product from "../../models/product";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => async (dispatch, getState) => {
  const { userId } = getState().auth;

  try {
    const response = await fetch(
      "https://shopappacademind.firebaseio.com/products.json"
    );

    if (!response.ok) {
      throw new Error("Error loading from Database!");
    }

    const resData = await response.json();

    const loadedProducts = [];

    for (const key in resData) {
      const { description, ownerId, imageURL, price, title } = resData[key];

      loadedProducts.push(
        new Product(key, ownerId, title, imageURL, description, price)
      );
    }

    dispatch({ type: SET_PRODUCTS, products: loadedProducts, userId });
  } catch (err) {
    // Send to custom analytics server!
    throw err;
  }
};

export const addProduct = (newProductInfo) => async (dispatch, getState) => {
  // Any async code here !

  const { userId, token } = getState().auth;

  const response = await fetch(
    "https://shopappacademind.firebaseio.com/products.json" + `?auth=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newProductInfo, ownerId: userId }),
    }
  );

  const resData = await response.json();

  dispatch({
    type: ADD_PRODUCT,
    newProductInfo: {
      ...newProductInfo,
      id: resData.name,
      ownerId: userId,
    },
  });
};

export const editProduct = (editProductInfo) => async (dispatch, getState) => {
  // Any async code here!

  const { existingId, title, imageURL, description } = editProductInfo;
  const { token, userId } = getState().auth;

  try {
    const response = await fetch(
      "https://shopappacademind.firebaseio.com/products/" +
        existingId +
        `.json?auth=${token}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          imageURL,
          description,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Database Error!");
    }

    dispatch({
      type: EDIT_PRODUCT,
      editProductInfo,
    });
  } catch (err) {
    throw err;
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  const { token } = getState().auth;

  try {
    const response = await fetch(
      "https://shopappacademind.firebaseio.com/products/" +
        productId +
        ".json" +
        `?auth=${token}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      throw new Error("Database Error!");
    }

    dispatch({
      type: DELETE_PRODUCT,
      productId,
    });
  } catch (err) {
    throw err;
  }
};
