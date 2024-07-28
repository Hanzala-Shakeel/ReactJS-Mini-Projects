import './App.css';
import { useState } from 'react';

function App() {
  const [value1, setValue1] = useState("");
  const [num1, setNum1] = useState(null);
  const [operator1, setOperator1] = useState("");

  function addValue(value) {
    setValue1(value1 + value);
  }

  function operator(operator) {
    setNum1(value1);
    setValue1("");
    setOperator1(operator)
  }

  function getResult() {
    if (num1 !== null && operator1 !== "") {
      const num2 = value1;
      let result;
      if (operator1 === "+") {
        result = Number(num1) + Number(num2);
      }
      else if (operator1 === "-") {
        result = Number(num1) - Number(num2);
      }
      else if (operator1 === "*") {
        result = Number(num1) * Number(num2);
      }
      else if (operator1 === "/") {
        result = Number(num1) / Number(num2);
      }
      setValue1(result.toString());
      setNum1(null);
      setOperator1("");
    }
  }

  function clearScreen() {
    setValue1("");
    setNum1(null);
    setOperator1("");
  }

  return (
    <div className="App">
      <h1>Calculator</h1>
      <div>
        <input type="text" readOnly value={value1} />
      </div>
      <div>
        <button className='btn btn-primary' onClick={() => addValue(1)}>1</button>
        <button className='btn btn-primary' onClick={() => addValue(2)}>2</button>
        <button className='btn btn-primary' onClick={() => addValue(3)}>3</button>
        <button className='btn btn-primary' onClick={() => operator("+")}>+</button>
      </div>
      <div>
        <button className='btn btn-primary' onClick={() => addValue(4)}>4</button>
        <button className='btn btn-primary' onClick={() => addValue(5)}>5</button>
        <button className='btn btn-primary' onClick={() => addValue(6)}>6</button>
        <button className='btn btn-primary' onClick={() => operator("-")}>-</button>
      </div>
      <div>
        <button className='btn btn-primary' onClick={() => addValue(7)}>7</button>
        <button className='btn btn-primary' onClick={() => addValue(8)}>8</button>
        <button className='btn btn-primary' onClick={() => addValue(9)}>9</button>
        <button className='btn btn-primary' onClick={() => operator("*")}>*</button>
      </div>
      <div>
        <button className='btn btn-primary' onClick={() => addValue(0)}>0</button>
        <button className='btn btn-primary' onClick={() => operator("/")}>/</button>
        <button className='btn btn-primary' onClick={clearScreen}>C</button>
        <button className='btn btn-primary' onClick={getResult}>=</button>
      </div>
    </div>
  );
}

export default App;
