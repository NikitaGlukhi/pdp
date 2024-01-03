import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Constructor } from '../types';

export const unsubscribeMixin = <T extends Constructor>(base: T = class {} as T) =>
  class extends base implements OnDestroy {
    protected readonly subscriptions = new Subscription();

    ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
    }
  };
