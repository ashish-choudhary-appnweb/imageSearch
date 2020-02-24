import {combineReducers} from 'redux';
import ImageReducer from './imageReducer';

export default combineReducers({
  image: ImageReducer,
});
