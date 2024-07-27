import "./App.css"
import { useState, useEffect } from 'react';
import { db, collection, addDoc, doc, setDoc, getDoc, getDocs, deleteDoc } from "./config/firebase";

function App() {
  const [getTodo, setGetTodo] = useState([]);
  const [showTodo, setShowTodo] = useState("");

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "todos"));
      let todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({ ...doc.data(), todoId: doc.id })
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
      setGetTodo(todos);
    }
    fetchData()
  }, [])

  async function addTodo() {
    if (showTodo !== "") {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "todos"), {
        todo: showTodo,
        isChecked: false
      });
      setShowTodo("");
      getData(docRef.id)
      console.log("Document written with ID: ", docRef.id);

      const todoRef = doc(db, 'todos', docRef.id);
      setDoc(todoRef, {
        todo: showTodo,
        isChecked: false,
        id: docRef.id
      });
    }
  }

  async function getData(id) {
    const docRef = doc(db, "todos", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      let currentData = { todo: docSnap.data().todo, todoId: docSnap.data().id }
      setGetTodo([...getTodo, currentData]);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async function deleteTodo(id) {
    await deleteDoc(doc(db, "todos", id));
    let newData = getTodo.filter((todo) => todo.todoId !== id)
    setGetTodo(newData)
  }

  function editTodo(id) {
    let edit = getTodo.map((v) => {
      return v.todoId === id ? { ...v, isChecked: !v.isChecked } : v
    })
    setGetTodo(edit);

    let editTodo = edit.find((v) => {
      return v.todoId === id;
    })

    const todoRef = doc(db, 'todos', id);

    setDoc(todoRef, {
      todo: editTodo.todo,
      isChecked: editTodo.isChecked,
      id: editTodo.todoId
    });
  }

  return (
    <div className='App'>
      <div>
        <h1>todo</h1>
      </div>
      <input type="text" value={showTodo} onChange={e => setShowTodo(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
      {
        getTodo.map && getTodo.map((v, i) => {
          return <div className="my-4" key={i}><h4 style={{
            textDecoration: v.isChecked ? "line-through" : "none",
          }}>{v.todo}</h4>
            <input type="checkbox" onChange={() => editTodo(v.todoId)} checked={v.isChecked || false} />
            <button onClick={() => deleteTodo(v.todoId)}>Delete</button>
          </div>
        })
      }
    </div>
  )
}

export default App;
