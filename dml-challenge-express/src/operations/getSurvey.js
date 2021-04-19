const { Surveys } = require('../db')

// TODO: Complete getSurvey operation
const getSurvey = async (req, res) => {
  const {
    params: { surveyId }
  } = req

  const survey = await Surveys.findOne({
    where: { uuid: surveyId }
  })

  if (!survey) {
    res.status(404).send()
  } else {
    res.status(200).send(survey)
  }
}

module.exports = getSurvey
