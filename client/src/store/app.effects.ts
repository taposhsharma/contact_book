import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as MyActions from './app.actions';

@Injectable()
export class MyEffects {
 

  constructor(private actions$: Actions) {}
}
