import {
  FETCH_BUILDINGS_REQUEST,
  FETCH_BUILDINGS_SUCCESS,
  FETCH_BUILDINGS_FAILURE,
  ADD_BUILDING_REQUEST,
  ADD_BUILDING_SUCCESS,
  ADD_BUILDING_FAILURE,
} from './actionCreator';

const initialState = {
  listOfBuildings: [],
  isLoading: false,
  error: undefined,
};

export default function buildings(state = initialState, action) {
  switch (action.type) {
    case FETCH_BUILDINGS_REQUEST:
    case ADD_BUILDING_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_BUILDINGS_SUCCESS:
      return {
        ...state, listOfBuildings: action.payload, isLoading: false, error: undefined,
      };
    case FETCH_BUILDINGS_FAILURE:
    case ADD_BUILDING_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case ADD_BUILDING_SUCCESS:
      return { ...state, listOfBuildings: [...state.listOfBuildings, action.payload] };
    default:
      return state;
  }
}
