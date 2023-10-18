import { createReducer, on } from '@ngrx/store';
import * as MyActions from './app.actions';

export interface MyState {
  islogin: boolean;
}

export const initialState: MyState = {
  islogin: false,
};

const myReducer = createReducer(
  initialState,
  on(MyActions.login, (state) => ({ ...state, islogin: true })),
  on(MyActions.logout, (state) => ({ ...state, islogin: false }))
);

export function reducer(
  state: MyState | undefined,
  action: MyActions.MyActionsUnion
): MyState {
  return myReducer(state, action);
}
