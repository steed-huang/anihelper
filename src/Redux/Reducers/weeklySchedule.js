const initialState = {
  days: null,
  loading: false,
  error: false,
};

const weeklyScheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_UPDATESCHEDULE":
      return { ...state, loading: true, error: false };
    case "REQUEST_UPDATESCHEDULE_SUCCESS":
      return { days: action.payload, loading: false, error: false };
    case "REQUEST_UPDATESCHEDULE_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default weeklyScheduleReducer;
