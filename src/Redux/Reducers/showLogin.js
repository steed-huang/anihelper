const showLoginReducer = (state = { show: false }, action) => {
  switch (action.type) {
    case "TOGGLE_ON":
      return { show: true };
    case "TOGGLE_OFF":
      return { show: false };
    default:
      return state;
  }
};

export default showLoginReducer;
