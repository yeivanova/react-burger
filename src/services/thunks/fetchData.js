import { loadData } from "../actions/ingredients";
import { getIngredients } from "../../utils/burger-api.js";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (data, returnValue) => {
  return data.success ? returnValue : Promise.reject(data);
};

export const fetchData = () => (dispatch) => {
  //spinner starts
  fetch(`https://norma.nomoreparties.space/api/ingredients`)
    .then(checkResponse)
    .then((items) => dispatch(loadData(items.data)))
    .catch(() => console.error("Ошибка в получении данных."));

  //spinner ends
};
