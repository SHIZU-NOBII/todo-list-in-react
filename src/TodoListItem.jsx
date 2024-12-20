import { useContext, useRef, useState } from "react";
import { TodoContex } from "./App";

export function TodoListItem({ id, name, completed }) {
  const inputRef = useRef()
  const { toggle, deleteTodos, updateTodos } = useContext(TodoContex);
  const [isEditing, setEditing] = useState(false);

  const handleSave = (e) => {
    e.preventDefault()
    if(inputRef.current.value === '') return

    updateTodos(id, inputRef.current.value)
    setEditing(false);
  };

  return (
    <li className="todo-item">
      <div className="todo-content">
        {isEditing ? (
          // When in editing mode, show an input field for the name
          <form onSubmit={handleSave} className="edit-form">
            <input type="text" placeholder='Edit your Todo here' ref={inputRef} />
            <button>
              <i className="fas fa-save"></i> Save
            </button>
          </form>
        ) : (
          // When not in editing mode, show the name as text
          <>
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              checked={completed}
              onChange={() => toggle(id)}
            />
            <span className="todo-text">{name}</span>
          </>
        )}
      </div>
      <div className="btns">
        {!isEditing && (
          <button onClick={() => setEditing(true)} className="edit-btn">
            <i className="fas fa-edit"></i> Edit
          </button>
        )}
        <button onClick={() => deleteTodos(id)} className="delete-btn">
          <i className="fas fa-trash-alt"></i> Delete
        </button>
      </div>
    </li>
  );
}
