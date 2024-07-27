import React, { useState } from "react";

import "./App.css";

export default function App() {
  const [todo, setTodo] = useState("");
  const [showData, setShowData] = useState([]);

  const valueOnChange = (e) => {
    setTodo(e.target.value);
  };

  const addItem = () => {
    if (!todo) {
    } else {
      const newData = showData.concat(todo);
      setShowData(newData);
      setTodo("");
    }
  };

  const deleteItem = (id) => {
    const data = showData.filter((value, index) => {
      return id !== index;
    });
    setShowData(data);
  };
  const editItem = (id) => {
    console.log(id);
    const newTodo = prompt("enter new todo", showData[id]);
    if (newTodo !== null && newTodo !== showData[id]) {
      const newData = showData.concat();
      newData[id] = newTodo;
      setShowData(newData);
    }
  };

  return (
    <div className="container">
      <h1>Add Todo</h1>
      <input value={todo} type="text" onChange={valueOnChange} />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {showData.map((value, index) => (
          <div key={index}>
            <li>{value}</li>
            <button className="delete" onClick={() => deleteItem(index)}>
              Delete
            </button>
            <button className="edit" onClick={() => editItem(index)}>
              Edit
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}
