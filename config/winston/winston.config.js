const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");

const myFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.errors({ stack: true }),
    winston.format.align(),
    winston.format.printf((info) => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`)
);

const transport = new DailyRotateFile({
    filename: "application-%DATE%.log",
    dirname: path.join(__dirname, "../../", "logs"),
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    prepend: true,
    level: "debug",
});

const logger = winston.createLogger({
    format: myFormat,
    transports: [transport, new winston.transports.Console({ level: "info" })],
});

/*
const logger = createLogger({
    level: "debug",
    format: combine(timestamp(), json(), errors({ stack: true }), myFormat),
    transports: [new transports.Console(), new transports.File({ filename: "application-%DATE%.log", rotationFormat: true, maxFiles: 14, maxsize: 104857600, dirname: path.join(__dirname, "../../", "logs") })],
});
*/

loggerDefaultRoute = (req, res, next) => {
    const { method, url, params, headers } = req;
    logger.info(`${method} | ${url} | ${JSON.stringify(params)} | ${JSON.stringify(headers)}`);
    next();
};

module.exports = {
    loggerDefaultRoute,
    logger,
};
