type LogType = 'log' | 'info' | 'error' | 'warn' | 'debug'

interface Logger {
  log(message?: any, ...optionalParams: any[]): void
  error(message?: any, ...optionalParams: any[]): void
  warn(message?: any, ...optionalParams: any[]): void
  debug(message?: any, ...optionalParams: any[]): void
  info(message?: any, ...optionalParams: any[]): void
}

const createLogger = (logType: LogType): ((message?: any, ...optionalParams: any[]) => void) => {
  if (import.meta.env.PROD && logType !== 'error') {
    return () => {}
  }

  return Function.prototype.bind.call(console[logType], 'Pelm - ')
}

const logger: Logger = {
  log: createLogger('log'),
  info: createLogger('info'),
  error: createLogger('error'),
  warn: createLogger('warn'),
  debug: createLogger('debug')
}

export default logger
