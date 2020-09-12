const initialState = {
  recommentations: null,
  total: null,
  progress: null,
  loading: false,
  error: false,
};

const recReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_UPDATEREC":
      return { ...state, loading: true, error: false };
    case "REQUEST_UPDATEREC_TOTAL":
      // for adding total fetch count to state
      return { ...state, total: action.payload, progress: 0 };
    case "REQUEST_UPDATEREC_PROGRESS":
      // for updating progress
      return { ...state, progress: action.payload };
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
