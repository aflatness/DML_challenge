const { Surveys } = require('../db')

// TODO: Complete getSurveys operation
const getSurveys = async (req, res) => {
  const surveys = await Surveys.findAll({
  })
  res.status(200).send(surveys)
}

module.exports = getSurveys
