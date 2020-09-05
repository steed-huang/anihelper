const initialState = {
  recommentations: null,
  loading: false,
  error: false,
};

const recReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_UPDATEREC":
      return { ...state, loading: true, error: false };
    case "REQUEST_UPDATEREC_SUCCESS":
      return {
        recommentations: action.payload,
        loading: false,
        error: false,
      };
    case "REQUEST_UPDATEREC_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default recReducer;
