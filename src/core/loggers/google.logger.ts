import { Logging } from '@google-cloud/logging';
import { ConsoleLogger } from '@nestjs/common';
import { getCredentials } from './utils';

export class GoogleCloudLogger extends ConsoleLogger {
  private readonly gcpLogging = new Logging({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: getCredentials(process.env.GCP_CREDENTIALS),
  });
  private readonly _log = this.gcpLogging.log('citizens-photo-api');
  log(message: string, context?: string) {
    super.log(message, context);
    this.writeLog('INFO', message, context);
  }

  error(message: string, trace?: string, context?: string) {
    super.error(message, trace, context);
    this.writeLog('ERROR', `${message} -> ${trace}`, context);
  }

  warn(message: string, context?: string) {
    super.warn(message, context);
    this.writeLog('WARNING', message, context);
  }

  debug(message: string, context?: string) {
    super.debug(message, context);
    this.writeLog('DEBUG', message, context);
  }

  verbose(message: string, context?: string) {
    super.verbose(message, context);
    this.writeLog('VERBOSE', message, context);
  }

  private async writeLog(severity: string, message: string, context?: string) {
    const entry = this._log.entry({ severity }, { message, context });
    await this._log.write(entry);
  }
}
