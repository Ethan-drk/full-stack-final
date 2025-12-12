import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import {TypeChart} from "./components/TypeChart";
import './App.css';
import TaskList from './components/TaskList';
//import { getExpenses, createExpense, updateExpenses, deleteExpense } from './api/Expenses';
import { getExpenses, getTotals, createExpense, deleteExpense } from './api/Expenses';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function App() {
  // State management
  const [expenses, setExpenses] = useState([]);
  const [activeExpense, setActiveExpense] = useState(null);
  const [newExpenseTitle, setNewExpenseTitle] = useState('');
  const [newExpenseType, setNewExpenseType] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({labels: [],datasets: []})

  // Load tasks from database on mount
  useEffect(() => {
    loadExpenses();
  }, []);

  /**
   * Fetch all tasks from backend
   */
  const loadExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError('Failed to load tasks. Make sure your backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function loadTotals() {
      try {
        const totals = await getTotals(); 

        const labels = totals.map(t => t.type);
        const amounts = totals.map(t => t.totalAmount);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Expenses by Category",
              data: amounts,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1
            }
          ]
        });
      } catch (err) {
        console.error("Error loading chart data:", err);
      }
    }

    loadTotals();
  }, [expenses]);
  /**
   * Add a new task
   */
  const handleAddTask = async (e) => {
    e.preventDefault();
  const amountPattern = /^\d+(\.\d{2})$/;
  if (!amountPattern.test(newExpenseAmount)) {
    setError("Amount must be in the format $xx.xx ");
    return;
  }
    if (!newExpenseTitle.trim()) return;

    try {
      // 1. Save to database via backend
      const newExpense = await createExpense({ title: newExpenseTitle, type: newExpenseType, amount: newExpenseAmount});
      
      // 2. Update React state (add to beginning of list)
      setExpenses([newExpense, ...expenses]);
      
      // 3. Clear input
      setNewExpenseTitle("");
      setNewExpenseType("");
      setNewExpenseAmount("");
      setError(null);
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to add task');
    }
  };

  

  /**
   * Delete a task
   */
  const handleDeleteExpense = async (taskId) => {
    try {
      // 1. Delete from database
      await deleteExpense(taskId);
      
      // 2. Remove from React state
      setExpenses(expenses.filter(t => t._id !== taskId));
      
      // 3. Clear active task if it was deleted
      if (activeExpense?._id === taskId) {
        setActiveExpense(null);
      }
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task');
    }
  };





  // Loading state
  if (loading) {
    return (
      <div className="app loading">
        <div className="spinner"></div>
        <p>Loading expenses...</p>
      </div>
    );
  }


  const today = new Date();
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const date = today. getDate();
  const currentDate = month + "/" + date + "/" + year;

  return (
    <div className="app">
      <header>
        <h1>Expense tracker</h1>
        <p>Today is {currentDate}</p>
      </header>

      {error && (
        <div className="error-banner">
          ⚠️ {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <div className="main-content">
        {/* Left side: Task List */}
        <div className="task-section">
          <h2>Expenses</h2>
          
          {/* Add Task Form */}
          <form onSubmit={handleAddTask} className="add-task-form">
            <input
              type="text"
              value={newExpenseTitle}
              onChange={(e) => setNewExpenseTitle(e.target.value)}
              placeholder="Name of Expense"
              className="task-input"
            />
            <input
            type="text"
            placeholder="Type"
            value={newExpenseType}
            onChange={(e) => setNewExpenseType(e.target.value)}
            />
            <input
            type="number"
            step="0.01"
            placeholder="Amount"
            value={newExpenseAmount}
            onChange={(e) => setNewExpenseAmount(e.target.value)}
            />

            <button type="submit" className="add-button">
              Add Expense
            </button>
          </form>

          {/* Task List */}
          <TaskList
            expenses={expenses}
            activeExpense={activeExpense}
            //onToggleComplete={handleToggleComplete}
            onDeleteExpense={handleDeleteExpense}
          />
        </div>
        <div className="timer-section">
      <TypeChart chartData={chartData} />
    </div>
      </div>
    </div>
  );
}

export default App;
