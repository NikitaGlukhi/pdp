import { AfterViewInit, OnDestroy, Component, OnInit } from '@angular/core';
import { tap, Subscription } from 'rxjs';

import { AlertsService, ClockService } from '../../services';

@Component({
  selector: 'alerts-outlet',
  templateUrl: './alerts-outlet.component.html',
  styleUrls: ['./alerts-outlet.component.scss'],
})
export class AlertsOutletComponent implements AfterViewInit, OnDestroy, OnInit {
  private readonly subscriptions = new Subscription();

  constructor(
    readonly alertsService: AlertsService,
    private readonly clockService: ClockService,
  ) {
    console.log('AlertsOutletComponent constructor');
  }

  ngOnInit(): void {
    console.log('AlertsOutletComponent ngOnInit');

    const alertSub = this.alertsService.alerts$.subscribe((alert) => {
      console.log({ alert });
    });
    this.subscriptions.add(alertSub);
  }

  ngAfterViewInit(): void {
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
