// login modal
export const toggleLogin = () => {
  return {
    type: "TOGGLE",
  };
};

// update username async
export const updateName = (name) => {
  return {
    type: "FETCH_UPDATENAME",
    payload: name,
  };
};

export const requestUpdateName = () => {
  return {
    type: "REQUEST_UPDATENAME",
  };
};

export const requestUpdateNameSuccess = (name) => {
  return {
    type: "REQUEST_UPDATENAME_SUCCESS",
    payload: name,
  };
};

export const requestUpdateNameError = () => {
  return {
    type: "REQUEST_UPDATENAME_FAIL",
  };
};

// update schedule async
export const updateSchedule = () => {
  return {
    type: "FETCH_UPDATESCHEDULE",
  };
};

export const requestUpdateSchedule = () => {
  return {
    type: "REQUEST_UPDATESCHEDULE",
  };
};

export const requestUpdateScheduleSuccess = (days) => {
  return {
    type: "REQUEST_UPDATESCHEDULE_SUCCESS",
    payload: days,
  };
};

export const requestUpdateScheduleError = () => {
  return {
    type: "REQUEST_UPDATESCHEDULE_FAIL",
  };
};

// update userdata async
export const updateAnimeList = () => {
  return {
    type: "FETCH_UPDATEANIMELIST",
  };
};

export const requestUpdateAnimeList = () => {
  return {
    type: "REQUEST_UPDATEANIMELIST",
  };
};

export const requestUpdateAnimeListSuccess = (days) => {
  return {
    type: "REQUEST_UPDATEANIMELIST_SUCCESS",
    payload: days,
  };
};

export const requestUpdateAnimeListError = () => {
  return {
    type: "REQUEST_UPDATEANIMELIST_FAIL",
  };
};
