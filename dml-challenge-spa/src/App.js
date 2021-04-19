import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Survey from './components/survey'
import Header from './components/header'
import UserList from './components/userList'
import './App.scss'

const App = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState('admin')
  const [currUser, setCurrUser] = useState({})

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

  const takeSurvey = (user) => {
    setCurrUser(user)
    setPage('survey')
  }

  if (page === 'admin') {
    return (
      <>
        <Header getUsers={getUsers} />
        <UserList users={users} takeSurvey={takeSurvey} />
      </>
    )
  } else {
    return (
      <>
        <Survey setPage={setPage} user={currUser} getUsers={getUsers} />
      </>
    )
  }
}

export default App
