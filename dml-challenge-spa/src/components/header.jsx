import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'

const Header = ({ getUsers }) => {
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')

  const clearFields = () => {
    setFirst('')
    setLast('')
    setEmail('')
  }

  const getLink = () => {
    Axios.post('http://localhost:8080/surveys', { first, last, email })
      .then(({ data }) => {
        console.log('Survey Created', data)
        clearFields()
        getUsers()
      })
      .catch((err) => {
        console.log(err)
        clearFields()
      })
  }
  return (
    <>
      <input placeholder='First Name' onChange={(e) => setFirst(e.target.value)} value={first} />
      <input placeholder='Last Name' onChange={(e) => setLast(e.target.value)} value={last} />
      <input placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} value={email} />
      <button onClick={getLink}>Get Link</button>
    </>
  )
}

Header.propTypes = {
  getUsers: PropTypes.func
}

export default Header
