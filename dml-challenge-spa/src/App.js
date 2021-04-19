import React, { useState, useEffect } from 'react'
import Axios from 'axios'
// import options from './cors'
import Header from './components/header'
import UserList from './components/userList'
import './App.scss'

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    Axios.get('http://localhost:8080/surveys')
      .then(({ data }) => {
        console.log('Data Retrieved')
        setUsers(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <Header getUsers={getUsers} />
      <UserList users={users} />
    </>
  )
}

export default App
