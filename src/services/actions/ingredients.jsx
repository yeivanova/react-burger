export const GET_INGREDIENTS_REQUEST = "INGREDIENTS/GET_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "INGREDIENTS/GET_SUCCESS";
export const GET_INGREDIENTS_FAILED = "INGREDIENTS/GET_FAILED";
export const CHANGE_TAB = "CHANGE_TAB";

const urlApi = "https://norma.nomoreparties.space/api/ingredients";
export function loadData() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    fetch(urlApi)
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .then((items) => {
        if (items && items.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            items: items.data,
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}
