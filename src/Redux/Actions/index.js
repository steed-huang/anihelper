// login modal
export const toggleLoginOn = () => {
  return {
    type: "TOGGLE_ON",
  };
};

export const toggleLoginOff = () => {
  return {
    type: "TOGGLE_OFF",
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

export const requestUpdateFavouritesSuccess = (favourites) => {
  return {
    type: "REQUEST_UPDATEFAVOURITES_SUCCESS",
    payload: favourites,
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

// update recommendations async
export const updateRecommendations = () => {
  return {
    type: "FETCH_UPDATEREC",
  };
};

export const requestUpdateRec = () => {
  return {
    type: "REQUEST_UPDATEREC",
  };
};

export const requestUpdateRecSuccess = (shows) => {
  return {
    type: "REQUEST_UPDATEREC_SUCCESS",
    payload: shows,
  };
};

export const requestUpdateRecError = () => {
  return {
    type: "REQUEST_UPDATEREC_FAIL",
  };
};

export const requestUpdateRecTotal = (total) => {
  return {
    type: "REQUEST_UPDATEREC_TOTAL",
    payload: total,
  };
};

export const requestUpdateRecProgress = (progress) => {
  return {
    type: "REQUEST_UPDATEREC_PROGRESS",
    payload: progress,
  };
};
