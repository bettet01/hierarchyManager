import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import "./styles.css";
import ManagerBox from "./components/ManagerBox/ManagerBox";
import ManagerInputBox from "./components/ManagerInputBox/ManagerInputBox";
import RemoveButton from "../src/components/RemoveButton/RemoveButton";
import AddButton from "./components/AddButton/AddButton";
import object from "../savefile.csv";

function App() {
  // Setting State
  const [columnValues, setColumnValues] = useState(object);
  const [managerValue, setManagerValue] = React.useState("");

  /* Functions i'm planning to prop drill down to needed values */

  const addManager = e => {
    e.preventDefault();
    const item = e.target.elements.manager.value;
    const add = {
      [item]: {
        name: [item],
        cycles: {
          "New Cycle": {
            cycleName: "New Cycle",
            employees: {}
          }
        }
      }
    };
    setColumnValues({ ...columnValues, ...add });
    setManagerValue("");
  };

  const removeManager = id => {
    const clone = Object.assign({}, columnValues);
    delete clone[id];
    setColumnValues(clone);
  };

  const addGroup = (name, manager) => {
    setColumnValues(prevState => ({
      ...prevState,
      [manager]: {
        ...prevState[manager],
        cycles: {
          ...prevState[manager]["cycles"],
          [name]: {
            cycleName: [name],
            employees: {}
          }
        }
      }
    }));
  };

  const removeGroup = (manager, id) => {
    const clone = Object.assign({}, columnValues);
    delete clone[manager]["cycles"][id];
    setColumnValues(clone);
  };

  const moveGroup = (dropName, managerName) => {
    const items = Object.keys(dropName);
    const name = items[1];
    const add = dropName[name];
    const oldManager = dropName["manager"];
    console.log(oldManager);

    const clone = Object.assign({}, columnValues);
    delete clone[oldManager]["cycles"][name];
    setColumnValues(clone);

    setColumnValues(prevState => ({
      ...prevState,
      [managerName]: {
        ...prevState[managerName],
        cycles: {
          ...prevState[managerName]["cycles"],
          [name]: {
            cycleName: [name],
            employees: { ...add }
          }
        }
      }
    }));
  };

  const addEmployee = (managerName, cycle, firstName, lastName) => {
    const name = firstName + " " + lastName;

    setColumnValues(prevState => ({
      ...prevState,
      [managerName]: {
        ...prevState[managerName],
        cycles: {
          ...prevState[managerName]["cycles"],
          [cycle]: {
            ...prevState[managerName]["cycles"][cycle],
            employees: {
              ...prevState[managerName]["cycles"][cycle]["employees"],
              [name]: {
                firstName: [firstName],
                lastName: [lastName],
                username: "testusername"
              }
            }
          }
        }
      }
    }));
  };

  // const removeEmployee = () => {};

  const moveEmployee = (itemName, dropName, managerName) => {
    const items = Object.keys(itemName);
    const name = items[1];
    const oldManager = itemName[items[2]];
    const cycleDelete = itemName[items[3]];
    const add =
      columnValues[oldManager]["cycles"][cycleDelete]["employees"][name];
    console.log(oldManager);

    // TODO: remove employee from old cycle (still need to get old cycle name)
    const clone = Object.assign({}, columnValues);
    delete clone[oldManager]["cycles"][cycleDelete]["employees"][name];
    setColumnValues(clone);

    // Add the employee to the new cycle
    setColumnValues(prevState => ({
      ...prevState,
      [managerName]: {
        ...prevState[managerName],
        cycles: {
          ...prevState[managerName]["cycles"],
          [dropName]: {
            ...prevState[managerName]["cycles"][dropName],
            employees: {
              ...prevState[managerName]["cycles"][dropName]["employees"],
              [name]: { ...add }
            }
          }
        }
      }
    }));
  };

  return (
    <div className="App">
      <div className="main--container">
        <DndProvider backend={HTML5Backend}>
          {Object.keys(columnValues)
            .map(key => {
              return { id: key, ...columnValues[key] };
            })
            .map(item => (
              <ManagerBox
                addEmployee={addEmployee}
                addButton={<AddButton />}
                addGroup={addGroup}
                removeGroup={removeGroup}
                removeButton={<RemoveButton />}
                key={item.id}
                managerName={item.id}
                addManager={addManager}
                removeManager={removeManager}
                cycles={item.cycles}
                moveEmployee={moveEmployee}
                moveGroup={moveGroup}
              />
            ))}
          <ManagerInputBox
            managerValue={managerValue}
            setManagerValue={setManagerValue}
            addManager={addManager}
          />
        </DndProvider>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
