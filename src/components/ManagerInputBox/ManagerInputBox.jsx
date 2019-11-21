import React from "react";

import "./ManagerInputBox.css";

const ManagerInputBox = props => {
  const handleChange = event => {
    props.setManagerValue(event.target.value);
  };

  return (
    <form className="manager--input-container" onSubmit={props.addManager}>
      <input
        onChange={handleChange}
        value={props.managerValue}
        name="manager"
        type="text"
        placeholder="... Manager Name Here"
      />
      <button type="submit">Add Manager</button>
    </form>
  );
};

export default ManagerInputBox;
