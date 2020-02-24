import {actionTypes} from '../types';

export const fetchImagesAction = payload => {
  return {
    type: actionTypes.FETCH_IMAGE,
    payload,
  };
};
