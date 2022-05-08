import {
  SET_VIEWED_INGREDIENT,
  CLEAR_VIEWED_INGREDIENT,
} from "../actions/viewed-ingredient";

const viewedIngredientInitialState = {
  viewedIngredient: [],
};

export const viewedIngredientReducer = (
  state = viewedIngredientInitialState,
  action
) => {
  switch (action.type) {
    case SET_VIEWED_INGREDIENT: {
      return {
        ...state,
        viewedIngredient: action.viewedIngredient,
      };
    }
    case CLEAR_VIEWED_INGREDIENT: {
      return {
        ...state,
        viewedIngredient: [],
      };
    }
    default:
      return state;
  }
};
