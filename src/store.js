import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import UserSlice from './feature/userSlice/UserSlice';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true,
});

export default configureStore({
  reducer: {
    user: UserSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
