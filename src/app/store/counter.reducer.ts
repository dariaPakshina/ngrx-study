import { createReducer, on } from '@ngrx/store';
import { decrement, increment, set } from './counter.actions';

const initialState = 0; // anything can be state

//function that takes data and gives data to store
export const counterReducer = createReducer(
  initialState,
  // listening to action & daying what shd happen to data
  on(increment, (state, action) => state + action.value),
  on(decrement, (state, action) => state - action.value),
  on(set, (state, action) => action.value)
);
