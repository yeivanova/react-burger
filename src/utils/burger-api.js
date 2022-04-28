const BURGER_API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (data, returnValue) => {
  return data.success ? returnValue : Promise.reject(data);
};

export const getIngredients = () => {
  return fetch(`${BURGER_API_URL}/ingredients`)
    .then(checkResponse)
    .then((data) => checkSuccess(data, data.data));
};

export const getOrder = (ingredientsArray) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: ingredientsArray,
    }),
  };

  return fetch(`${BURGER_API_URL}/orders`, requestOptions)
    .then(checkResponse)
    .then((data) => checkSuccess(data, data.order.number));
};
