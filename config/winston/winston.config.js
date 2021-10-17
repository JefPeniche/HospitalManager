const { createLogger, format, transports, config, error } = require('winston')
const { combine, timestamp, json, errors} = format;
const path = require('path');

const logger = createLogger({
  level: 'debug',
   format: combine(
       json(),
       errors({ stack: true })
     ),
   transports: [
       new transports.Console(),
       new transports.File({ maxsize: 104857600, dirname: path.join(__dirname, '../../', 'logs')})
     ],
 });

loggerDefaultRoute = (req, res, next) => {
  const { method, url, params, headers } = req
  logger.info(`${method} | ${url} | ${JSON.stringify(params)} | ${JSON.stringify(headers)}`);
  next()
}

module.exports = {
  loggerDefaultRoute,
  logger
}