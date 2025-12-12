const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const getExpenses = async () => {
  const response = await fetch(`${API_BASE_URL}/api/expenses`);
  if (!response.ok) {
    throw new Error('Failed to fetch expense');
  }
  return response.json();
};

export const getTotals = async () => {
  const response = await fetch(`${API_BASE_URL}/api/expenses/totals`);
  if (!response.ok) {
    throw new Error('Failed to fetch expense');
  }
  return response.json();
};


export const createExpense = async (expenseData) => {
  const response = await fetch(`${API_BASE_URL}/api/expenses`, {
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


export const updateExpense = async (id, updates) => {
  const response = await fetch(`${API_BASE_URL}/api/expense/${id}`, {
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


 
export const deleteExpense = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/expense/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete expense');
  }
  return response.json();
};
