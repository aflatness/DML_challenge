import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'

const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple']

const Survey = ({ setPage, user: { first, uuid }, getUsers }) => {
  const [answer, setAnswer] = useState('')

  const submit = () => {
    if (!answer) {
      // eslint-disable-next-line no-undef
      alert('Please choose an answer.')
      return
    }
    Axios.patch(`http://localhost:8080/surveys/${uuid}`, { answer: answer })
      .then(() => {
        getUsers()
        setPage('admin')
      })
      .catch(console.log)
  }
  return (
    <div className='survey'>
      <h1>Hello {first}</h1>
      <div>Below is a simple survey, where we are asking users for their favorite color. Please choose from the objects below, and submit your answer when you are ready.</div>
      <div className='options'>
        {colors.map((color, i) => (
          <div key={i}>
            <input name='answer' type='radio' value={color} onChange={(e) => setAnswer(e.target.value)} />
            <label htmlFor={color} id={color}>{color}</label>
          </div>
        ))}
        <button id='submitSurvey' onClick={submit}>Submit</button>
      </div>
    </div>
  )
}

Survey.propTypes = {
  setPage: PropTypes.func,
  user: PropTypes.shape({
    first: PropTypes.string,
    uuid: PropTypes.string
  }),
  getUsers: PropTypes.func
}

export default Survey
