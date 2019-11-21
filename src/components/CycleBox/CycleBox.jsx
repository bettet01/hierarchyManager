import React from "react";

import "./CycleBox.css";
import EmployeeBox from "../EmployeeBox/EmployeeBox";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "../../ItemTypes";

const CycleBox = props => {
  const [addfirstValue, setfirstValue] = React.useState("");

  const [, drag] = useDrag({
    item: {
      type: ItemTypes.CYCLE,
      [props.cycleName]: props.employees,
      manager: props.managerName
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: ItemTypes.EMPLOYEE,
    drop(item, monitor) {
      const managerName = props.managerName;
      const dropName = props.cycleName;
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        props.moveEmployee(item, dropName, managerName);
      }
    }
  });

  const removecycle = () => {
    const manager = props.managerName;
    const id = props.cycleName;
    props.removeGroup(manager, id);
  };

  const addEmployee = e => {
    e.preventDefault();
    const manager = props.managerName;
    const cycle = props.cycleName;
    const name = addfirstValue.split(" ");
    const firstName = name[0];
    const lastName = name[1];
    props.addEmployee(manager, cycle, firstName, lastName);
    setfirstValue("");
  };

  const handlefirstChange = e => {
    setfirstValue(e.target.value);
  };

  const changeCycleName = e => {
    e.target.contentEditable = "True";
  };

  return (
    <div ref={drag} className="cycle--container">
      <div onClick={removecycle} className="cycle--removebutton">
        {props.removeButton}
      </div>
      <form onSubmit={addEmployee} className="manager--box-addemployee">
        <input
          type="text"
          value={addfirstValue}
          onChange={handlefirstChange}
          placeholder="... Firstname Lastname"
        />
        <button type="submit">{props.addButton}</button>
      </form>
      <div
        spellcheck="false"
        onDoubleClick={changeCycleName}
        id={props.cycleName}
        ref={drop}
      >
        <h4>{props.cycleName}</h4>
        {Object.keys(props.employees)
          .map(key => ({ id: key, ...props.employees[key] }))
          .map(item => {
            return (
              <EmployeeBox
                cycle={props.cycleName}
                managerName={props.managerName}
                employee={item}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CycleBox;
