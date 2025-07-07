import React, { useEffect, useState } from 'react'

const AllAcc = () => {
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/admin/accounts', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setAccounts(data.accs))
      .catch(err => console.error('Error fetching accounts:', err))
  }, [])

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-slate-700 mb-6">All Accounts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map(acc => (
          <div key={acc._id} className="border rounded-xl p-4 shadow-lg bg-white">
            <h3 className="text-lg font-semibold text-green-600">Acc No: {acc.accNumber}</h3>
            <p><strong>Type:</strong> {acc.accType}</p>
            <p><strong>Balance:</strong> ₹{acc.balance}</p>
            <p><strong>Branch:</strong> {acc.branchName}</p>
            <p><strong>IFSC:</strong> {acc.ifscCode}</p>
            <p><strong>Created:</strong> {new Date(acc.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAcc
