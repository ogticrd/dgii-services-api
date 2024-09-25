import { GoogleCloudLogger } from './google.logger';

export class InternalDisabledLogger extends GoogleCloudLogger {
  static contextsToIgnore = [
    'InstanceLoader',
    'RoutesResolver',
    'RouterExplorer',
  ];

  log(_: any, context?: string): void {
    if (!InternalDisabledLogger.contextsToIgnore.includes(context)) {
      // eslint-disable-next-line prefer-rest-params
      super.log.apply(this, arguments);
    }
  }
}
