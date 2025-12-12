function ExpenseItem({expense, onSelect, onDelete }) {
  return (
    <div className={`expense-item`}>
      <div className="expense-content" onClick={onSelect}>
        <h3 className="expense-title">Expense: {expense.title}</h3>
        <h3 className="expense-title">Type: {expense.type}</h3>
        <h3 className="expense-title">${expense.amount}</h3>
        <div className="expense-meta">
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={onDelete}
        className="delete-button"
        aria-label="Delete expense"
      >
        🗑️
      </button>
    </div>
  );
}

export default ExpenseItem;
