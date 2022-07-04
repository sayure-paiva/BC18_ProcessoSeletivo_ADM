import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

import { ObsWithStatusResult } from '../models/status-pipe'; 




@Pipe({
  name: 'obsWithStatus'
})
export class StatusPipe implements PipeTransform {

  transform<T = any>(value: Observable<T>): Observable<ObsWithStatusResult<T>> {
    return value.pipe(
      map((value: any) => {
        return {
          loading: value.type === 'start',
          value: value.type ? value.value : value,
        };
      }),
      startWith({ loading: true }),
      catchError((error: any) => of({ loading: false, error }))
    );

  }
   

}
