const { v4: uuidV4 } = require('uuid')
const { Surveys } = require('../db')

// TODO: Complete createSurvey operation
const createSurvey = async (req, res) => {
  console.log(req.body)
  const { first, last, email } = req.body
  const newSurvey = await Surveys.create({
    uuid: uuidV4(),
    first,
    last,
    email
  })
  res.status(201).send(newSurvey)
}

module.exports = createSurvey
