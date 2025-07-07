import React, { useEffect, useState } from 'react'

const Alltransactions = () => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/admin/transactions', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setTransactions(data.transactions))
      .catch(err => console.error('Error fetching transactions:', err))
  }, [])

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-slate-700 mb-6">All Transactions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {transactions.map(txn => (
          <div key={txn._id} className="border rounded-xl p-4 shadow-lg bg-white">
            <p><strong>Date:</strong> {new Date(txn.createdAt).toLocaleString()}</p>
            <p><strong>Type:</strong> {txn.type}</p>
            <p><strong>Amount:</strong> ₹{txn.amount}</p>
            <p><strong>Note:</strong> {txn.note}</p>
            <p><strong>From:</strong> {txn.fromAcc || '-'}</p>
            <p><strong>To:</strong> {txn.toAcc || '-'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Alltransactions
