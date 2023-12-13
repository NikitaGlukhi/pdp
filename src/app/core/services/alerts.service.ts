import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { v4 } from 'uuid';

import { IAlert } from '../models';

@Injectable({ providedIn: 'root' })
export class AlertsService {
  readonly alerts$ = new BehaviorSubject<IAlert[]>([]);

  constructor() {
    console.log('AlertsService constructor');
  }


  addAlert(newAlert: Omit<IAlert, 'id'>): string {
    const alerts = this.alerts$.getValue();
    const id = v4();
    alerts.push({
      id,
      ...newAlert,
    });

    this.alerts$.next(alerts);

    return id;
  }

  closeAlert(alertId: string): void {
    let alerts = this.alerts$.getValue();
    alerts = alerts.filter(a => a.id !== alertId);
    this.alerts$.next(alerts);
  }

  clear(): void {
    this.alerts$.next([]);
  }
}
