function TaskItem({expense, onSelect, onDelete }) {
  return (
    <div className={`task-item`}>

      {/* Task content - clicking selects for Pomodoro */}
      <div className="task-content" onClick={onSelect}>
        <h3 className="task-title">Expense: {expense.title}</h3>
        <h3 className="task-title">Type: {expense.type}</h3>
        <h3 className="task-title">${expense.amount}</h3>
        <div className="task-meta">
          {expense.pomodoroCount > 0 && (
            <span className="pomodoro-badge">
              {expense.pomodoroCount}
            </span>
          )}
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={onDelete}
        className="delete-button"
        aria-label="Delete task"
      >
        🗑️
      </button>
    </div>
  );
}

export default TaskItem;
