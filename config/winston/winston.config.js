const { createLogger, format, transports, config, error } = require("winston");
const { combine, timestamp, json, errors, printf} = format;
const path = require("path");

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `{\n${level}: ${message} \n[${label}] \n${timestamp}\n}`;
  });

const logger = createLogger({
    level: "debug",
    format: combine(
        timestamp(),
        json(),
        errors({ stack: true }),
        myFormat
        ),
    transports: [
        new transports.Console(), 
        new transports.File({ maxsize: 104857600, dirname: path.join(__dirname, "../../", "logs") })
    ],
});

loggerDefaultRoute = (req, res, next) => {
    const { method, url, params, headers } = req;
    logger.info(`${method} | ${url} | ${JSON.stringify(params)} | ${JSON.stringify(headers)}`);
    next();
};

module.exports = {
    loggerDefaultRoute,
    logger,
};
