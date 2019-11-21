import React, { useState } from "react";

import "./EmployeeBox.css";
import { useDrag } from "react-dnd";
import ItemTypes from "../../ItemTypes";

const EmployeeBox = props => {
  const [showAdditional, changeShowaddition] = useState(false);

  const [, drag] = useDrag({
    item: {
      type: ItemTypes.EMPLOYEE,
      [props.employee.id]: props.employee,
      manager: props.managerName,
      cycle: props.cycle
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const changeEmployeeName = e => {
    e.target.contentEditable = "True";
  };

  const changeIdName = e => {
    e.target.contentEditable = "True";
  };

  return (
    <div
      onDouClick={() => changeShowaddition(!showAdditional)}
      ref={drag}
      className="employee--container"
    >
      <div spellCheck="false" onClick={changeEmployeeName}>
        {props.employee.firstName} {props.employee.lastName}
      </div>
      {showAdditional && (
        <p spellCheck="false" onClick={changeIdName}>
          Uid: {props.employee.username}
        </p>
      )}
    </div>
  );
};

export default EmployeeBox;
