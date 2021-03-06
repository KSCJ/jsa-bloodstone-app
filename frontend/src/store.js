import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import thunk from 'redux-thunk';
import menu from './Menu/menuReducer';
import buildings from './Buildings/buildingReducer';
import auth from './Login/authReducer';
import troops from './Troops/troopReducer';
import resources from './Resources/resourcesReducer';
import oneBuilding from './OneBuilding/oneBuildingReducer';
import settings from './Settings/settingsReducer';

const rootReducer = combineReducers({
  auth,
  menu,
  buildings,
  troops,
  resources,
  oneBuilding,
  settings,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
