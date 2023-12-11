import { OnInit, OnDestroy, Component } from '@angular/core';
import { tap, Subscription } from 'rxjs';

import { IAlert } from '../../models';
import { AlertsService, ClockService } from '../../services';

@Component({
  selector: 'alerts-outlet',
  templateUrl: './alerts-outlet.component.html',
  styleUrls: ['./alerts-outlet.component.scss'],
})
export class AlertsOutletComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  constructor(
    readonly alertsService: AlertsService,
    private readonly clockService: ClockService,
  ) {}

  ngOnInit(): void {
    const clockSub = this.clockService.clock$
      .pipe(
        tap(now => {
          for (const alert of this.alertsService.alerts$.getValue()) {
            if (alert.time < now - 3000) {
              this.alertsService.closeAlert(alert.id);
            }
          }
        })
      ).subscribe();
    this.subscriptions.add(clockSub);
  }

  close(alertId: string): void {
    this.alertsService.closeAlert(alertId);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
