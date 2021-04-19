import React from 'react'
import PropTypes from 'prop-types'

const userList = ({ users, takeSurvey }) => (
  <div className='userList'>
    {users.map(({ first, last, response, uuid }, i) => (
      <div key={i}>
        <div className='userName'>{first} {last}</div>
        <div className='surveyStatus'>{response ? 'Completed' : 'Not Completed'}</div>
        <div className='userResponse'>{!response
          ? <button onClick={() => takeSurvey({ first, uuid })}>Copy Link</button>
          : response}
        </div>
      </div>
    ))}
  </div>
)

userList.propTypes = {
  users: PropTypes.array,
  takeSurvey: PropTypes.func
}

export default userList
