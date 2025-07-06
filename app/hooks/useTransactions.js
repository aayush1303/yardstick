import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useTransactions() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete('/api/transactions', { data: { id } });
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return { transactions, fetchTransactions, deleteTransaction };
}
