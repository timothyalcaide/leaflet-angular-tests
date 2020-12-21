import { Injectable, isDevMode } from '@angular/core';

type messageType = 'log' | 'warn';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {}

  message(message: string, data?: any, type?: messageType): void {
    if (isDevMode) {
      if (type === 'warn') {
        console.warn('Message:', message);
      } else {
        console.log('Message:', message);
      }

      if (data) {
        console.log('Data: ', data);
      }
    }
  }
}
