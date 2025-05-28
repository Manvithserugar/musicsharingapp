import React from "react";

const useToggle = (defaultState) => {
  const [toggleState, setToggleState] = React.useState(defaultState);

  const toggleFn = () => {
    setToggleState((prev) => !prev);
  };

  return [toggleState, toggleFn, setToggleState];
};

export default useToggle;
