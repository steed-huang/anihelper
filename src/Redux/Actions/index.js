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

// update tool
export const updateTool = (tool) => {
  return {
    type: "UPDATE",
    payload: tool,
  };
};
