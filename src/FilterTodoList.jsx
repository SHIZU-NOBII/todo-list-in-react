export function FilterTodoList({name, setName, completed, setCompleted}) {
  return (
    <div className="filter-form">
      <div className="filter-form-input">
        <input type="text" placeholder="Enter name to filter from list" value={name} onChange={e => setName(e.target.value)}/>
      </div>
      <div className="hide-completed">
        <input type="checkbox" checked={completed} onChange={e => setCompleted(e.target.checked)}/>
        <span>Hide Completed</span>
      </div>
    </div>
  );
}
