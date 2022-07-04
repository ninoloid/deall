import {ILogger} from './ILogger';

export interface ILoggerManager {
  setLogLevel(level: string): void;
  getLogger(name: string): ILogger;
}
