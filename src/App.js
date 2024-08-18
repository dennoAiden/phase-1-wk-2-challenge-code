import React, { useState, useEffect } from 'react';
import './App.css';
import TransactionForm from './Components/TransactionForm';
import TransactionsList from './Components/TransactionsList';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);

    fetch('http://localhost:5000/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    })
    .then(res => res.json())
    .catch(error => console.error('Error adding transaction:', error));
  };

  return (
    <div className="App">
      <h1>Bank Transactions</h1>
      <TransactionForm onSubmit={handleAddTransaction} />
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default App;