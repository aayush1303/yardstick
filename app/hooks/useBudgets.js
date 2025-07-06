import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useBudgets() {
  const [budgets, setBudgets] = useState([]);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get('/api/budgets');
      setBudgets(response.data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const saveBudget = async (budget) => {
    try {
      await axios.post('/api/budgets', budget);
      fetchBudgets();
    } catch (error) {
      console.error('Error saving budget:', error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return { budgets, fetchBudgets, saveBudget };
}
