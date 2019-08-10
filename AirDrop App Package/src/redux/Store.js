import { createStore, applyMiddleware } from "redux";
import rootReducer from './Reducers/Root'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import logger from 'redux-logger'
const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['wallet']
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(logger));
export const persistor = persistStore(store);