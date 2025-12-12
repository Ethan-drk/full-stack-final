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
import ExpenseList from './components/ExpenseList';
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

  useEffect(() => {
    loadExpenses();
  }, []);
  const loadExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error('Error loading expenses:', err);
      setError('Failed to load expenses. Make sure your backend is running.');
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
  

  const handleAddExpense = async (e) => {
    e.preventDefault();
  const amountPattern = /^\d+(\.\d{2})$/;
  if (!amountPattern.test(newExpenseAmount)) {
    setError("Amount must be in the format $xx.xx ");
    return;
  }
    if (!newExpenseTitle.trim()) return;

    try {
     
      const newExpense = await createExpense({ title: newExpenseTitle, type: newExpenseType, amount: newExpenseAmount});
      
      // 2. Update React state (add to beginning of list)
      setExpenses([newExpense, ...expenses]);
      
      // 3. Clear input
      setNewExpenseTitle("");
      setNewExpenseType("");
      setNewExpenseAmount("");
      setError(null);
    } catch (err) {
      console.error('Error creating expense:', err);
      setError('Failed to add expense');
    }
  };

  

  const handleDeleteExpense = async (expenseId) => {
    try {
      await deleteExpense(expenseId);
      
      setExpenses(expenses.filter(t => t._id !== expenseId));
      
      if (activeExpense?._id === expenseId) {
        setActiveExpense(null);
      }
    } catch (err) {
      console.error('Error deleting expense:', err);
      setError('Failed to delete expense');
    }
  };



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
        
        <div className="expense-section">
          <h2>Expenses</h2>
          
          
          <form onSubmit={handleAddExpense} className="add-expense-form">
            <input
              type="text"
              value={newExpenseTitle}
              onChange={(e) => setNewExpenseTitle(e.target.value)}
              placeholder="Name of Expense"
              className="expense-input"
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

          <ExpenseList
            expenses={expenses}
            activeExpense={activeExpense}
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
