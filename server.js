const app = require('./app')
const db = require('./config/db.config')
const { logger } = require('./config/winston/winston.config')

const server = app.listen(process.env.PORT, async () => {
  try {
    await db.authenticate() 
  } catch (error) {
    logger.error(error)
  }
})

module.exports = { server }
