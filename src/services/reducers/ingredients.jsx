import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  CHANGE_TAB,
} from "../actions/ingredients";

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

const initialStateTab = {
  currentTab: "bun",
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        items: action.items,
        itemsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        itemsFailed: true,
        itemsRequest: false,
      };
    }
    default:
      return state;
  }
};

export const tabReducer = (state = initialStateTab, action) => {
  switch (action.type) {
    case CHANGE_TAB: {
      return {
        ...state,
        currentTab: action.currentTab,
      };
    }
    default:
      return state;
  }
};
