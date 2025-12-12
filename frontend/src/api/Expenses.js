// Base URL for all API calls - change this for deployment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetch all expense from backend
 */
export const getExpenses = async () => {
  const response = await fetch(`${API_BASE_URL}api/expenses`);
  if (!response.ok) {
    throw new Error('Failed to fetch expense');
  }
  return response.json();
};

export const getTotals = async () => {
  const response = await fetch(`${API_BASE_URL}api/expenses/totals`);
  if (!response.ok) {
    throw new Error('Failed to fetch expense');
  }
  return response.json();
};
/**
 * Create a new task
 * @param {Object} expenseData - { title: string }
 */
export const createExpense = async (expenseData) => {
  const response = await fetch(`${API_BASE_URL}api/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseData),
  });
  if (!response.ok) {
    throw new Error('Failed to create expense');
  }
  return response.json();
};

/**
 * Update a task
 * @param {string} id - Task ID
 * @param {Object} updates - Fields to update
 */
export const updateExpense = async (id, updates) => {
  const response = await fetch(`${API_BASE_URL}api/expense/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update expense');
  }
  return response.json();
};

/**
 * Delete a task
 * @param {string} id - Task ID
 */
export const deleteExpense = async (id) => {
  const response = await fetch(`${API_BASE_URL}api/expense/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete expense');
  }
  return response.json();
};
