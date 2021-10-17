const { createLogger, format, transports, config } = require('winston')
const { combine, timestamp, json } = format;
const path = require('path');

const logger = createLogger({
   format: combine(
       timestamp({
           format: 'YYYY-MM-DD HH:mm:ss'
       }),
       json()
     ),
   transports: [
       new transports.Console(),
       new transports.File({ filename: 'combined.log', maxsize: 104857600, dirname: path.join(__dirname, '../', 'logs')})
     ],
 });

loggerDefaultRoute = (req, res, next) => {
  console.log('Hi')
  logger.log('debug', 'Now my debug messages are written to console!');
  next()
}

module.exports = {
  loggerDefaultRoute,
  logger
}
// module.exports = {
//   /**
//   * Log debuging messages
//   * @param  {String} message
//   */
//   debug: function(message) {
//     logger.log('debug','Data to log.');
//   },
//   /**
//   * Log information messages
//   * @param  {String} message
//   */
//   info: function(message) {
//     logger.log('info','Data to log.');
//   },
//   /**
//   * Log warning messages
//   * @param  {String} message
//   */
//   warn: function(message) {
//     logger.log('warn','Data to log.');
//   },
//   /**
//   * Log error messages
//   * @param  {String} message
//   */
//   error: function(message) {
//     logger.log('error','Data to log.');
//   }
// };