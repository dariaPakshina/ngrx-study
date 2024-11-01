import { Actions, createEffect, ofType } from '@ngrx/effects';
import { decrement, increment, init, set } from './counter.actions';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCount } from './counter.selectors';

export class CounterEffects {
  loadCount = createEffect(() =>
    this.actions$.pipe(
      ofType(init), // filter which action has side-effect
      switchMap(() => {
        const storedCounter = localStorage.getItem('count');
        if (storedCounter) {
          return of(set({ value: +storedCounter }));
        }
        return of(set({ value: 0 }));
      }) // dispatch=true bc we dispatch an action
    )
  );

  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        withLatestFrom(this.store.select(selectCount)),
        tap(([action, counter]) => {
          // console.log(action);
          localStorage.setItem('count', counter.toString());
        })
      ),
    { dispatch: false } // no new action dispatched
  );

  constructor(
    private actions$: Actions,
    private store: Store<{ counter: number }>
  ) {} //emits a new value when actions is dispatched
}
