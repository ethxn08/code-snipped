const initialState = "";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_SNIPPET":
      return action.payload;
    default:
      return state;
  }
};

export default rootReducer;
