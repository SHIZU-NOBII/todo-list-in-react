import "./style.css";
import { NewTodoForm } from "./NewTodoForm";
import { createContext,  useEffect, useReducer, useState } from "react";
import { TodoList } from "./TodoLIst";
import { FilterTodoList } from "./FilterTodoList";

const ACTIONS = {
  ADD: "ADD",
  TOGGLE: 'TOGGle',
  DELETE : 'DELETE',
  UPDATE : 'UPDATE'
};

export const TodoContex = createContext();

function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        { name: payload.name, id: crypto.randomUUID(), completed: false },
      ];
      case ACTIONS.TOGGLE :
      return todos.map(todo => {
        if(todo.id === payload.id) return {...todo, completed: !todo.completed}

        return todo
      })
      case ACTIONS.DELETE :
        return todos.filter(todo => todo.id !== payload.id)
        case ACTIONS.UPDATE :
          return todos.map(todo => {
            if(todo.id === payload.id) return {...todo, name: payload.name}

            return todo
          })
  }
}

const TODO_LIST_KEY = "TODOS_ITEM";

function App() {
  const [filterTodo, setFilterTodo] = useState('')
  const [ischecked, setIsChecked] = useState(false)
  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    const value = localStorage.getItem(TODO_LIST_KEY);
    if (value == null) return initialValue;

    return JSON.parse(value);
  });

  useEffect(() => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todos));
  }, [todos]);

  

  const filterTodoList = todos.filter(todo => {
    if(ischecked && todo.completed) return false
    return todo.name.includes(filterTodo)
  })

  function addTodos(name) {
    dispatch({ type: ACTIONS.ADD, payload: { name } });
  }

  function toggle(id) {
    dispatch({type: ACTIONS.TOGGLE, payload: {id}})
  }

  function deleteTodos(id) {
    dispatch({type: ACTIONS.DELETE, payload: {id}})
  }

  function updateTodos(id, name) {
    dispatch({type: ACTIONS.UPDATE, payload:{id, name}})
  }

  return (
    <TodoContex.Provider value={{ todos : filterTodoList, addTodos, toggle, deleteTodos, updateTodos }}>
      <FilterTodoList name={filterTodo} setName={setFilterTodo} completed={ischecked} setCompleted={setIsChecked}/> 
      <TodoList />
      <NewTodoForm />
    </TodoContex.Provider>
  );
}

export default App;
