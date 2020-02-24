import {actionTypes} from '../types';

const INITIAL_STATE = {
  images: [],
  error: null,
  isSearching: false,
};

export default (state = INITIAL_STATE, action) => {
  const {response} = action;
  switch (action.type) {
    case actionTypes.FETCH_IMAGE:
      return {...state, isSearching: true};
    case actionTypes.FETCH_IMAGE_SUCCESS:
      return {...state, images: response, isSearching: false};
    case actionTypes.FETCH_IMAGE_ERROR:
      return {...state, ...INITIAL_STATE, error: response};
    default:
      return state;
  }
};
