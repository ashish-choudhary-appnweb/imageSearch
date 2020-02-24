import {put, call} from 'redux-saga/effects';
import {fetchImagesService} from '../services/api';

import {actionTypes} from '../types';

export function* fetchImages(payload) {
  try {
    const response = yield call(fetchImagesService, payload.payload);
    yield put({
      type: actionTypes.FETCH_IMAGE_SUCCESS,
      response: response.images,
    });
  } catch (response) {
    yield put({type: actionTypes.FETCH_IMAGE_ERROR, response});
  }
}
