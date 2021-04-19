import React from 'react'
import PropTypes from 'prop-types'

const userList = ({ users }) => (
  <div className='userList'>
    {users.map(({ first, last, response }, i) => (
      <div key={i}>
        <div className='userName'>{first} {last}</div>
        <div className='surveyStatus'>{response === null ? 'Not Completed' : 'Completed'}</div>
        <div className='userResponse'>{response === null ? <button>Copy Link</button> : response} </div>
      </div>
    ))}
  </div>
)

userList.propTypes = {
  users: PropTypes.array
}

export default userList
