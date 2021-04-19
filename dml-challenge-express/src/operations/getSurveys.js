const { Surveys } = require('../db')

// TODO: Complete getSurveys operation
const getSurveys = async (req, res) => {
  const surveys = await Surveys.findAll({
  })
  res.send(surveys)
}

module.exports = getSurveys
