import React, { useEffect, useState } from 'react'

const Allusers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/admin/users', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setUsers(data.users))
      .catch(err => console.error('Error fetching users:', err))
  }, [])

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-slate-700 mb-6">All Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div key={user._id} className="border rounded-xl p-4 shadow-lg bg-white">
            <h3 className="text-lg font-semibold text-blue-700">{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Allusers
