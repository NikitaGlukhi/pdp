import { inject } from '@angular/core';
import { LoggingService } from '../services';

export const loggerFn = () => {
  const logger = inject(LoggingService);
  return (action: string)=> {
    logger.markAction(action);
  }
};
