const { Sequelize, Model, DataTypes } = require('sequelize')
// const { join } = require('path')

const sequelize = new Sequelize('sqlite::memory:')
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: join(__dirname, '../database.sqlite')
// })

class Surveys extends Model {}
Surveys.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  uuid: {
    type: DataTypes.UUID,
    allowNull: false
  },
  first: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  response: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, { sequelize, modelName: 'surveys' })

exports.db = sequelize
exports.Surveys = Surveys
