const { Surveys } = require('../db')

// TODO: Complete getSurvey operation
const getSurvey = async (req, res) => {
  const {
    params: { surveyId },
    body: { answer }
  } = req

  const survey = await Surveys.findOne({
    where: { uuid: surveyId }
  })
  if (!survey) {
    res.status(404).send()
  } else {
    survey.response = answer
    await survey.save()
    res.status(200).send()
  }
}

module.exports = getSurvey
