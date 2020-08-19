const initialState = {
  days: {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  },
  loading: false,
  error: false,
};

const weeklyScheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_UPDATESCHEDULE":
      return 1;
    case "REQUEST_UPDATESCHEDULE_SUCCESS":
      return 1;
    case "REQUEST_UPDATESCHEDULE_FAIL":
      return 1;
    default:
      return state;
  }
};

export default weeklyScheduleReducer;
