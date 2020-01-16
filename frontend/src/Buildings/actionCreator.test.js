import { SERVER_URL } from 'react-native-dotenv';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actionCreator from './actionCreator';

const URL = `http://${SERVER_URL}/kingdom/buildings`;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('buildings actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates FETCH_BUILDINGS_SUCCESS when fetching buildings has been done', () => {
    fetchMock.getOnce(URL, {
      body: { buildings: ['test'] },
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      { type: actionCreator.FETCH_BUILDINGS_REQUEST },
      { type: actionCreator.FETCH_BUILDINGS_SUCCESS, payload: {buildings: ['test']} },
    ];
    const store = mockStore();
    return store.dispatch(actionCreator.fetchBuildings()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_BUILDINGS_FAILURE when fetching buildings failed', () => {
    fetchMock.getOnce(URL, {
      status: 404,
    });
    const expectedActions = [
      { type: actionCreator.FETCH_BUILDINGS_REQUEST },
      { type: actionCreator.FETCH_BUILDINGS_FAILURE, payload: new Error('An error has occurred, please try later!') },
    ];
    const store = mockStore();
    return store.dispatch(actionCreator.fetchBuildings()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ADD_BUILDINGS_SUCCESS when adding buildings has been done', () => {
    fetchMock.getOnce(URL, {
      method: 'POST',
      body: { newBuildings: ['test'] },
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      { type: actionCreator.ADD_BUILDING_REQUEST },
      { type: actionCreator.ADD_BUILDING_SUCCESS, payload: { newBuildings: ['test'] } },
    ];
    const store = mockStore();
    return store.dispatch(actionCreator.addBuilding()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ADD_BUILDINGS_FAILURE when adding buildings failed', () => {
    fetchMock.getOnce(URL, {
      method: 'POST',
      status: 404,
    });
    const expectedActions = [
      { type: actionCreator.ADD_BUILDING_REQUEST },
      { type: actionCreator.ADD_BUILDING_FAILURE, payload: 404 },
    ];
    const store = mockStore();
    return store.dispatch(actionCreator.addBuilding()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
