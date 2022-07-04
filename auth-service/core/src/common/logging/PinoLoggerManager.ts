import {StaticImplements} from '../../domain/decorators/StaticImplements';
import {ILoggerManager} from './ILoggerManager';
import {PinoLogger} from './PinoLogger';

interface LoggerCollection {
  [key: string]: PinoLogger;
}

const _loggers: LoggerCollection = {};

let _level = 'debug';

@StaticImplements<ILoggerManager>()
export class PinoLoggerManager {
  public static setLogLevel(level: string): void {
    _level = level;
  }

  public static getLogger(name: string): PinoLogger {
    let logger: PinoLogger;

    if (!_loggers[name]) {
      logger = new PinoLogger({
        name,
        level: _level,
      });
      _loggers[name] = logger;
    } else {
      logger = _loggers[name];
    }

    return logger;
  }
}
