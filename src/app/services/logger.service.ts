import { Injectable, isDevMode } from '@angular/core';

type messageType = 'log' | 'warn';

const ACTIVE = false; // <---- Toggle logger in the console

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {}

  message(message: string, data?: any, type?: messageType): void {
    if (isDevMode && ACTIVE) {
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
