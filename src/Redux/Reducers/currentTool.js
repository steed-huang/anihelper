const currentToolReducer = (state = -1, action) => {
  switch (action.type) {
    case "TEST":
      return state + action.payload;
    default:
      return state;
  }
};

export default currentToolReducer;
