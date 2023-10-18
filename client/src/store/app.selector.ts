import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyState } from './app.reduers';

const selectMyState = createFeatureSelector<MyState>('myFeature');

export const selectIsLogin = createSelector(
  selectMyState,
  (state) => state.islogin
);
