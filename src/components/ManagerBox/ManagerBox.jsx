import React from "react";
import { useDrop } from "react-dnd";

import "./ManagerBox.css";
import CycleBox from "../CycleBox/CycleBox";
import ItemTypes from "../../ItemTypes";

const ManagerBox = props => {
  const [addGroupValue, setGroupValue] = React.useState("");

  const [, drop] = useDrop({
    accept: ItemTypes.CYCLE,
    drop(item, monitor) {
      const cycleName = item;
      const managerName = props.managerName;
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        // add moveGroup function here
        props.moveGroup(cycleName, managerName);
      }
    }
  });

  const removeManager = () => {
    const id = props.managerName;
    props.removeManager(id);
  };

  const addGroup = e => {
    e.preventDefault();
    const name = addGroupValue;
    const manager = props.managerName;
    props.addGroup(name, manager);
    setGroupValue("");
  };

  const handleChange = event => {
    setGroupValue(event.target.value);
  };

  const changeManagerName = event => {
    event.target.contentEditable = true;
  }

  return (
    <div ref={drop} className="manager--box-container">
      <div onClick={removeManager} className="manager--box-removebutton">
        {props.removeButton}
      </div>
      <form onSubmit={addGroup} className="manager--box-addgroup">
        <input
          type="text"
          value={addGroupValue}
          onChange={handleChange}
          placeholder="... Add Group Name"
        />
        <button>{props.addButton}</button>
      </form>
      <h2 spellcheck="false" onDoubleClick={changeManagerName}>{props.managerName}</h2>
      {Object.keys(props.cycles)
        .map(key => ({ id: key, ...props.cycles[key] }))
        .map(item => {
          return (
            <CycleBox
              addEmployee={props.addEmployee}
              addButton={props.addButton}
              removeButton={props.removeButton}
              removeGroup={props.removeGroup}
              managerName={props.managerName}
              moveEmployee={props.moveEmployee}
              cycleName={item.cycleName}
              employees={item.employees}
            />
          );
        })}
    </div>
  );
};

export default ManagerBox;
