import reducer from './buildingReducer';
import * as actionCreator from './actionCreator';

describe('buildings reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        listOfBuildings: [],
        buildingPrice: [],
        isLoading: false,
        error: undefined,
      },
    );
  });

  it('should handle FETCH_BUILDINGS_REQUEST', () => {
    expect(
      reducer(
        {
          listOfBuildings: [],
          buildingPrice: [],
          isLoading: false,
          error: undefined,
        },
        {
          type: actionCreator.FETCH_BUILDINGS_REQUEST,
        },
      ),
    ).toEqual(
      {
        listOfBuildings: [],
        buildingPrice: [],
        isLoading: true,
        error: undefined,
      },
    );
  });

  it('should handle FETCH_BUILDINGS_SUCCESS', () => {
    expect(
      reducer(
        {
          listOfBuildings: [],
          buildingPrice:[],
          isLoading: true,
          error: undefined,
        },
        {
          type: actionCreator.FETCH_BUILDINGS_SUCCESS,
          payload: {buildings: ['test']},
        },
      ),
    ).toEqual(
      {
        listOfBuildings: ['test'],
        buildingPrice: undefined,
        isLoading: false,
        error: undefined,
      },
    );
  });

  it('should handle FETCH_BUILDINGS_FAILURE', () => {
    expect(
      reducer(
        {
          listOfBuildings: [],
          buildingPrice: [],
          isLoading: true,
          error: undefined,
        },
        {
          type: actionCreator.FETCH_BUILDINGS_FAILURE,
          payload: new Error('test'),
        },
      ),
    ).toEqual(
      {
        listOfBuildings: [],
        buildingPrice: [],
        isLoading: false,
        error: new Error('test'),
      },
    );
  });
});
