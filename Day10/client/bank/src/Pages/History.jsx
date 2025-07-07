import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'

const History = () => {
  const [account, setAccount] = useState(null)
  const [history, setHistory] = useState([])
  const [accNumber, setAccNumber] = useState(null)
  const { userName } = useUser()
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const fetchAccountData = async () => {
        try {
          const res = await fetch(`http://localhost:5000/acc/${userName}`, {
            method: 'GET',
            credentials: 'include',
          })
          const data = await res.json()
          if (res.ok && data.acc) {
            setAccount(data.acc)
            console.log('account', account)
            setAccNumber(data.acc.accNumber)
          } else {
            console.error('Account not found or error')
          }
        } catch (err) {
          console.error('Error fetching account:', err)
        }
      }
      fetchAccountData()
  },[userName])

  const fetchHistory = async (accNo) => {
    try {
      setLoading(true)
      const res = await fetch(`http://localhost:5000/user/history/${accNo}`, {
        method: 'GET',
        credentials: 'include',
      })
      const data = await res.json()
      if (res.ok && Array.isArray(data.transactionHistory)) {
        setHistory(data.transactionHistory)
      } else {
        setHistory([]) 
        console.warn(data.message || 'Failed to fetch history')
      }
    } catch (err) {
      console.error('Error fetching history:', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (accNumber) {
      fetchHistory(accNumber)
    }
  }, [accNumber])

  return (
    <div className='md:p-10 p-1 overflow-hidden'>
      <h2 className='text-2xl font-bold mt-10 mb-6 text-slate-600'>Transaction History</h2>

      {loading ? (
        <p className='text-slate-500'>Loading history...</p>
      ) : history.length > 0 ? (
        <table className="w-full border">
          <thead className=' text-left'>
            <tr className="bg-slate-200">
              <th className="md:p-2 p-1">Date</th>
              <th className="md:p-2 p-1">Type</th>
              <th className="md:p-2 p-1">Amount</th>
              <th className="md:p-2 p-1 md:flex hidden">Note</th>
              <th className="md:p-2 p-1">From</th>
              <th className="md:p-2 p-1">To</th>
            </tr>
          </thead>
          <tbody>
            {history.map((txn, i) => (
              <tr key={i} className="border-t">
                <td className="md:p-2 p-1">{new Date(txn.timestamp).toLocaleString()}</td>
                <td className="md:p-2 p-1">{txn.type}</td>
                <td className="md:p-2 p-1">₹{txn.amount}</td>
                <td className="md:p-2 p-1 md:block hidden">{txn.note}</td>
                <td className="md:p-2 p-1">{txn.fromAcc || '-'}</td>
                <td className="md:p-2 p-1">{txn.toAcc || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-slate-500'>No transaction history found.</p>
      )}
    </div>
  )
}

export default History
