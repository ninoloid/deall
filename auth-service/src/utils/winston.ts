import winston from 'winston';

const createLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({})
  ],
  exitOnError: false,
});

export const logger = (context: string, message: string, scope: string) => {
  const obj = {
    context,
    scope,
    message: message,
  };

  createLogger.info(obj);
}

export const errorLogger = (context: string, message: string, scope: string) => {
  const obj = {
    context,
    scope,
    message: message,
  };

  createLogger.error(obj);
}
