import { useContext, useRef } from "react";
import { TodoContex } from "./App";

export function NewTodoForm() {
  const inputRef = useRef()  

  const { addTodos } = useContext(TodoContex)

  function handleForm(e) {
    e.preventDefault()

    if(inputRef.current.value === '') return

    addTodos(inputRef.current.value)

    inputRef.current.value = ''
  }

  return (
    <form onSubmit={handleForm} className="todo-form">
      <h2>Todo List App</h2>
      <input type="text" placeholder="Enter your todo name" ref={inputRef}/>
      <button className="todo-form-btn">Add to do</button>
    </form>
  );
}
