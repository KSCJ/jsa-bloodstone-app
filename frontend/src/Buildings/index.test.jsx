import React from 'react';
import renderer, { act } from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { useDispatch, useSelector } from 'react-redux';
import { addBuildingSuccess } from './actionCreator';

import Buildings from '.';
import BuildingItem from './buildingItem';
import AddBuildingItem from './addBuildingItem';
import OneBuilding from '../OneBuilding';

jest.mock('react-redux');
jest.mock('./actionCreator');
jest.mock('./buildingItem', () => () => 'buildingItem');
jest.mock('./addBuildingItem', () => () => 'addBuildingItem');
jest.mock('../OneBuilding', () => () => 'oneBuilding');

const buildings = [
  {
    _id: 1,
    type: 'Townhall',
    level: 1,
    hp: 1,
    started_at: 12345789,
    finished_at: 12399999,
  }, {
    _id: 2,
    type: 'Academy',
    level: 1,
    hp: 1,
    started_at: 12345789,
    finished_at: 12399999,
  }, {
    _id: 3,
    type: 'Farm',
    level: 1,
    hp: 1,
    started_at: 12345789,
    finished_at: 12399999,
  }, {
    _id: 4,
    type: 'Mine',
    level: 1,
    hp: 1,
    started_at: 12345789,
    finished_at: 12399999,
  },
];

describe('<Buildings />', () => {
  beforeEach(() => {
    useDispatch.mockImplementation(() => () => {});
  });

  afterAll(() => {
    jest.resetModules();
  });

  it('Should opening oneBuilding after press BuildingItem', () => {
    const mockedState = {
      buildings: {
        listOfBuildings: buildings,
        isLoading: false,
        error: undefined,
      },
      auth: {
        token: 'test token',
      },
    };
    useSelector.mockImplementation((func) => func(mockedState));

    const testRenderer = renderer.create(<Buildings />);
    const testInstance = testRenderer.root;

    act(() => {
      testInstance.findAllByType(BuildingItem).forEach((node) => {
        node.props.onPress();
      });
    });

    expect(testInstance.findAllByType(OneBuilding).length).toBe(1);
  });

  it('Should add BuildingItems after press AddBuildingItem', () => {
    const mockedState = {
      buildings: {
        listOfBuildings: buildings,
        isLoading: false,
        error: undefined,
      },
      auth: {
        token: 'test token',
      },
    };
    useSelector.mockImplementation((func) => func(mockedState));
    const mockDispatch = jest.fn(() => { });
    useDispatch.mockImplementation(() => mockDispatch);
    addBuildingSuccess.mockReturnValue('test_action');

    const testRenderer = renderer.create(<Buildings />);
    const testInstance = testRenderer.root;

    testInstance.findAllByType(AddBuildingItem).forEach((node) => {
      node.props.onPress();
    });
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith('test_action');
  });

  it('Should render buildings and match the snapshot', () => {
    const mockedState = {
      buildings: {
        listOfBuildings: buildings,
        buildingPrice: priceOfBuilding,
        isLoading: false,
        error: undefined,
      },
      auth: {
        token: 'test token',
      },
    };
    useSelector.mockImplementation((func) => func(mockedState));

    const shallowRenderer = new ShallowRenderer();
    const tree = shallowRenderer.render(<Buildings />);

    expect(tree).toMatchSnapshot();
  });

  it('Should render loading and match the snapshot', () => {
    const mockedState = {
      buildings: {
        listOfBuildings: buildings,
        buildingPrice: priceOfBuilding,
        isLoading: true,
        error: undefined,
      },
      auth: {
        token: 'test token',
      },
    };
    useSelector.mockImplementation((func) => func(mockedState));

    const shallowRenderer = new ShallowRenderer();
    const tree = shallowRenderer.render(<Buildings />);

    expect(tree).toMatchSnapshot();
  });

  it('Should render error and match the snapshot', () => {
    const mockedState = {
      buildings: {
        listOfBuildings: buildings,
        buildingPrice: undefined,
        isLoading: true,
        error: new Error('test error'),
      },
      auth: {
        token: 'test token',
      },
    };
    useSelector.mockImplementation((func) => func(mockedState));

    const shallowRenderer = new ShallowRenderer();
    const tree = shallowRenderer.render(<Buildings />);

    expect(tree).toMatchSnapshot();
  });
});
