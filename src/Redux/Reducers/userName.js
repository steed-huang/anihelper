const initialState = {
  username: null,
  loading: false,
  error: false,
};

// loading is too fast so im not using it lol

const userNameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_UPDATENAME":
      return { ...state, loading: true };
    case "REQUEST_UPDATENAME_SUCCESS":
      return {
        username: action.payload,
        loading: false,
        error: false,
      };
    case "REQUEST_UPDATENAME_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default userNameReducer;
