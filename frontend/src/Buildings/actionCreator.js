import { SERVER_URL } from 'react-native-dotenv';

export const FETCH_BUILDINGS_REQUEST = 'fetchBuildingsRequest';
export const FETCH_BUILDINGS_SUCCESS = 'fetchBuildingsSuccess';
export const FETCH_BUILDINGS_FAILURE = 'fetchBuildingsFailure';
export const ADD_BUILDING_REQUEST = 'addBuildingRequest';
export const ADD_BUILDING_SUCCESS = 'addBuildingSuccess';
export const ADD_BUILDING_FAILURE = 'addBuildingFailure';

const URL = `http://${SERVER_URL}/kingdom/buildings`;

export function fetchBuildings(token) {
  return (dispatch) => {
    dispatch({ type: FETCH_BUILDINGS_REQUEST });
    return fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('An error has occurred, please try later!');
      })
      .then((response) => dispatch({ type: FETCH_BUILDINGS_SUCCESS, payload: response }))
      .catch((error) => dispatch({ type: FETCH_BUILDINGS_FAILURE, payload: error }));
  };
}

export function addBuilding(type, token) {
  return (dispatch) => {
    dispatch({ type: ADD_BUILDING_REQUEST });
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 400) {
          return dispatch({ type: ADD_BUILDING_FAILURE, payload: response.message });
        }
        if (response.status === 200) {
          return dispatch({ type: ADD_BUILDING_SUCCESS, payload: response });
        }
        throw new Error(response.status);
      })
      .catch((error) => dispatch({ type: ADD_BUILDING_FAILURE, payload: error }));
  };
}
