const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const { db } = require('./db')
const createSurvey = require('./operations/createSurvey')
const getSurvey = require('./operations/getSurvey')
const getSurveys = require('./operations/getSurveys')

// This will reset database and delete all data/create all tables
db.sync({ force: true })

const app = express()

app.use(logger('dev'))
app.use(express.json())

app.get('/surveys', getSurveys)
app.post('/surveys', createSurvey)
app.get('/surveys/:surveyId', getSurvey)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.json({ err })
})

module.exports = app
