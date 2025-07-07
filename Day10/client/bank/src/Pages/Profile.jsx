import React, { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import userimg from "../Assets/user.jpg"

const Profile = () => {
  const { userName } = useUser()
  const [userData, setUserData] = useState(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    if (userName) {
      fetch(`http://localhost:5000/user/id/${userName}`)
        .then(res => res.json())
        .then(data => {
          if (data.userId) {
            setUserId(data.userId)
          } else {
            console.error("No userId returned")
          }
        })
        .catch(err => console.error('Error fetching userId:', err))
    }
  }, [userName])

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/user/details/${userId}`)
        .then(res => res.json())
        .then(data => setUserData(data.userDetails))
        .catch(err => console.error('Error fetching user details:', err))
    }
  }, [userId])

  return (
    <div className="p-10 flex w-full h-full">
        <div className='md:flex hidden w-2/4 '>
            <img className='w-3/4' src={userimg} alt="userimg" />
        </div>
      <div className='w-full mt-20 md:w-2/5 h-full flex flex-col border-2 rounded-md p-4'>
      <h2 className="text-2xl font-bold font-body text-slate-500 mb-4">Profile</h2>
      {userData ? (
        <div className="space-y-10 ">
          <p className='para'><strong>Name:</strong> {userData.name}</p>
          <p className='para'><strong>Email:</strong> {userData.email}</p>
          <p className='para'><strong>Phone:</strong> {userData.phone}</p>
          <p className='para'><strong>Role:</strong> {userData.role}</p>
          <p className='para'><strong>Created At:</strong> {new Date(userData.createdAt).toLocaleString()}</p>
          <p className='para'><strong>User ID:</strong> {userData._id}</p>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
      </div>
    </div>
  )
}

export default Profile
