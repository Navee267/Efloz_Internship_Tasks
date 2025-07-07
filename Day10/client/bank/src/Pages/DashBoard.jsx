import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const navigate = useNavigate()

  const fetchAllData = async () => {
    try {
      const userRes = await fetch('http://localhost:5000/admin/users', { credentials: 'include' })
      const accRes = await fetch('http://localhost:5000/admin/accounts', { credentials: 'include' })
      const txnRes = await fetch('http://localhost:5000/admin/transactions', { credentials: 'include' })

      const userData = await userRes.json()
      const accData = await accRes.json()
      const txnData = await txnRes.json()

      if (userRes.ok) setUsers(userData.users)
      if (accRes.ok) setAccounts(accData.accs)
      if (txnRes.ok) setTransactions(txnData.transactions)
    } catch (err) {
      console.error('Error loading dashboard:', err)
    }
  }

  const gotoTransactions = ()=>{
    navigate('/alltransactions')
  }

  const gotoUsers = ()=>{
    navigate('/allusers')
  }

  const gotoAcc = ()=>{
    navigate('/allacc')
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    fetch('http://localhost:5000/admin/me', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role === 'admin') {
          setIsAdmin(true)
        } else {
          navigate('/')
        }
      })
      .catch((err) => {
        console.error(err)
        navigate('/')
      })
  }, [navigate])

  if (!isAdmin) return <p>Loading...</p>

  return (
    <div className="p-10 min-h-screen bg-slate-100">
      <h1 className="text-3xl font-bold mb-8 text-slate-700">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300" onClick={gotoUsers}>
          <h2 className="text-lg text-slate-500 mb-2">Total Users</h2>
          <p className="text-4xl font-bold text-blue-600">{users.length}</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300" onClick={gotoAcc}>
          <h2 className="text-lg text-slate-500 mb-2">Total Accounts</h2>
          <p className="text-4xl font-bold text-green-600">{accounts.length}</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300" onClick={gotoTransactions}>
          <h2 className="text-lg text-slate-500 mb-2">Total Transactions</h2>
          <p className="text-4xl font-bold text-purple-600">{transactions.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
