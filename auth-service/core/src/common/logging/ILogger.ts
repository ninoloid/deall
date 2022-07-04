export interface ILogger {
  fatal(obj?: {[key: string]: any}, msg?: string): void;
  warn(obj?: {[key: string]: any}, msg?: string): void;
  info(obj?: {[key: string]: any}, msg?: string): void;
  debug(obj?: {[key: string]: any}, msg?: string): void;
  trace(obj?: {[key: string]: any}, msg?: string): void;
}
