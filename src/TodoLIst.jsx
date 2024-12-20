import { useContext } from "react"
import { TodoContex } from "./App"
import { TodoListItem } from "./TodoListItem"

export function TodoList() {
    const { todos } = useContext(TodoContex)
    return (
        <ul className="todo-list">

            {todos.map(todo => {
                return (
                    <TodoListItem key={todo.id} {...todo} />
                )
                
            })}
        </ul>
    )
}