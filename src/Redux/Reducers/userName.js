const initialState = {
  username: null,
  loading: false,
  error: false,
};

const userNameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_UPDATENAME":
      return { ...state, loading: true, error: false };
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
