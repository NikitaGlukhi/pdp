import { Injectable } from '@angular/core';

import { interval, Observable, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  public clock$: Observable<number> = interval(1000)
    .pipe(
      map(() => Date.now()),
      shareReplay(1)
    );
}
