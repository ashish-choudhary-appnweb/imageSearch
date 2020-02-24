import {takeLatest} from 'redux-saga/effects';
import {fetchImages} from './imageSaga';
import {actionTypes} from '../types';

export default function* watchUserAuthentication() {
  yield takeLatest(actionTypes.FETCH_IMAGE, fetchImages);
}
