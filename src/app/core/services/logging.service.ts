import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {
  markAction(action: string): void {
    console.warn(`${action} triggered`);
  }
}
