const initialState = {
  has_list: false,
  watching: null,
  completed: null,
  favourites: null,
  loading: false,
  error: false,
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_UPDATEANIMELIST":
      return { ...state, loading: true, error: false };
    case "REQUEST_UPDATEANIMELIST_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
      };
    case "REQUEST_UPDATEANIMELIST_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default userDataReducer;
