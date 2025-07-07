import React, { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom"

const Account = () => {
  const { userName } = useUser()
  const [account, setAccount] = useState(null)
  const [amount, setAmount] = useState(0)
  const [toAcc, setToacc] = useState('')

  const [userId, setUserId] = useState(null)

  const deposit = async () => {
    try {
      const res = await fetch('http://localhost:5000/transaction/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId, amount }),
      })
      const data = await res.json()
      if (res.ok) {
        alert('Deposited Successfully')
        fetchAccountData()
      } else {
        alert(data.message)
      }
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const fetchAccountData = () => {
    fetch(`http://localhost:5000/acc/${userName}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setAccount(data.acc)
        setUserId(data.acc.userId)
      })
      .catch((err) => console.error('Error fetching account:', err))
  }

  useEffect(() => {
    if (userName) {
      fetchAccountData()
    }
  }, [userName])

  const withdraw = async () => {
    try {
      const res = await fetch('http://localhost:5000/transaction/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId, amount }),
      })
      const data = await res.json()
      if (res.ok) {
        alert('Withdrawn Successfully')
        fetchAccountData()
      } else {
        alert(data.message)
      }
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const transfer = async () => {
    try {
      const res = await fetch('http://localhost:5000/transaction/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId, amount, toAcc }),
      })
      const data = await res.json()
      if (res.ok) {
        alert('Transferred Successfully')
        fetchAccountData()
      } else {
        alert(data.message)
      }
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const actionType = e.nativeEvent.submitter.name
    if (!userId) return alert("User ID not loaded yet!")

    if (actionType === 'deposit') await deposit()
    else if (actionType === 'withdraw') await withdraw()
    else if (actionType === 'transfer') await transfer()
  }

  useEffect(() => {
    if (userName) {
      fetch(`http://localhost:5000/acc/${userName}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          setAccount(data.acc)
          setUserId(data.acc.userId) 
        })
        .catch((err) => console.error('Error fetching account:', err))
    }
  }, [userName])

  const createAcc = async()=>{
    try{
        const res = await fetch('http://localhost:5000/acc',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : 'include',
        body : JSON.stringify({name : userName})
    })

    const data = await res.json()
    if(res.ok){
      alert('Account Created Successfully!')
      setAccount(data.newAcc)
    }
    else {
        alert(data.message)
      }
    }
    catch(err){
    console.error('Create account error:', err)
    alert('Error: ' + err.message)
    }
  }

  return (
    <div className="p-10 flex md:flex-row flex-col w-full h-full items-center md:justify-around">
      <div className="w-full mt-20 md:w-2/5 h-full flex flex-col border-2 rounded-md p-4">
        <h2 className="text-2xl font-bold text-slate-600 mb-4">Transaction</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="number"
            placeholder="Amount"
            className="p-2 border rounded-md w-full mb-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="To Account (only for transfer)"
            className="p-2 border rounded-md w-full mb-4"
            value={toAcc}
            onChange={(e) => setToacc(e.target.value)}
          />
          <div className="flex gap-4">
            <button name="deposit" type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
              Deposit
            </button>
            <button name="withdraw" type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded-md">
              Withdraw
            </button>
            <button name="transfer" type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Transfer
            </button>
          </div>
        </form>
        <div className='w-full h-full flex mt-10'>
        <Link to='/history' className='hover:text-slate-500 border-2 p-2 rounded-md transform ease-in-out duration-300'>Transaction History <FontAwesomeIcon icon={faArrowRight}/></Link>
      </div>
      </div>

      <div className="w-full mt-20 md:w-2/5 h-full flex flex-col border-2 rounded-md p-4">
        <h2 className="text-2xl font-bold text-slate-600 mb-4">Account Details</h2>
        {account ? (
          <div className="space-y-4">
            <p><strong>Account Number:</strong> {account.accNumber}</p>
            <p><strong>Type:</strong> {account.accType}</p>
            <p><strong>Balance:</strong> ₹{account.balance}</p>
            <p><strong>Branch:</strong> {account.branchName}</p>
            <p><strong>IFSC:</strong> {account.ifscCode}</p>
            <p><strong>Created At:</strong> {new Date(account.createdAt).toLocaleString()}</p>
          </div>
        ) : (
          <span onClick={createAcc} className='border-2 w-fit p-3 rounded-md hover:bg-slate-500 cursor-pointer transform ease-in-out duration-300 hover:text-white'> <FontAwesomeIcon icon={faAdd}/> Create Account</span>
        )}
      </div>
    </div>
  )
}

export default Account
