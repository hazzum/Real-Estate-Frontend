import { compose, applyMiddleware, createStore, Store, StoreEnhancer, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { persistStore, autoRehydrate } from 'redux-persist';
import user, { UserState, initUserState } from '../Modules/User';
import status, { StatusState, initStatusState } from '../Modules/Status';
import criteria, { CriteriaState, initCriteriaState } from 'Redux/Modules/Criteria';
import logger from 'redux-logger';

export interface RootState {
  status: StatusState;
  user: UserState;
  criteria: CriteriaState;
}
const initState: RootState = {
  status: initStatusState,
  user: initUserState,
  criteria: initCriteriaState
}; 

const rootReducer = combineReducers<RootState>({
  user,
  status,
  criteria
});

const hydrate: StoreEnhancer<RootState> = autoRehydrate() as StoreEnhancer<RootState>;
const middleware: StoreEnhancer<RootState> = applyMiddleware(promise(), thunk, logger);
const store: Store<RootState> = createStore<RootState>(rootReducer, initState, compose(middleware, hydrate));

persistStore(store, { whitelist: ['status'] });

export default store;