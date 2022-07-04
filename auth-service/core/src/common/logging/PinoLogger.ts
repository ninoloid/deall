import pino from 'pino';
import {ILogger} from './ILogger';

export interface IPinoLoggerConstructor {
  name: string;
  level: string;
}

export class PinoLogger implements ILogger {
  private _logger: pino.Logger;

  constructor(args: IPinoLoggerConstructor) {
    this._logger = pino({
      name: args.name,
      level: args.level,
      base: {
        pid: process.pid,
      },
    });
  }

  fatal(obj?: {[key: string]: any}, msg?: string): void {
    if (obj) {
      this._logger.fatal(obj, msg);
    } else {
      if (msg) {
        this._logger.fatal(msg);
      }
    }
  }

  warn(obj?: {[key: string]: any}, msg?: string): void {
    if (obj) {
      this._logger.warn(obj, msg);
    } else {
      if (msg) {
        this._logger.warn(msg);
      }
    }
  }

  info(obj?: {[key: string]: any}, msg?: string): void {
    if (obj) {
      this._logger.info(obj, msg);
    } else {
      if (msg) {
        this._logger.info(msg);
      }
    }
  }

  debug(obj?: {[key: string]: any}, msg?: string): void {
    if (obj) {
      this._logger.debug(obj, msg);
    } else {
      if (msg) {
        this._logger.debug(msg);
      }
    }
  }

  trace(obj?: {[key: string]: any}, msg?: string): void {
    if (obj) {
      this._logger.trace(obj, msg);
    } else {
      if (msg) {
        this._logger.trace(msg);
      }
    }
  }
}
