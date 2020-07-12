// login related
export const toggleLogin = () => {
  return {
    type: "TOGGLE",
  };
};

export const updateName = (name) => {
  return {
    type: "UPDATE",
    payload: name,
  };
};

// update tool
export const updateTool = (tool) => {
  return {
    type: "UPDATE",
    payload: tool,
  };
};
