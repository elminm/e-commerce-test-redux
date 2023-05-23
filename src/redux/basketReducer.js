export const basketReducer = (
  state = JSON.parse(localStorage.getItem("basket")) || [],
  action
) => {
  switch (action.type) {
    case "ADD_BASKET": {
      localStorage.setItem(
        "basket",
        JSON.stringify([...state, action.payload])
      );

      return [...state, action.payload];
    }
    case "REMOVE_BASKET":
      localStorage.setItem(
        "basket",
        JSON.stringify([...state.filter((q) => q.id != action.payload)])
      );
      return [...state.filter((q) => q.id !== action.payload)];
    default:
      return state;
  }
};
