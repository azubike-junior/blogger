const dotenv = require('dotenv').config()

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
      connectTimeout: 60000
    }
  }
}

module.exports.jwtConfigs = {
  secret: process.env.SECRET
}