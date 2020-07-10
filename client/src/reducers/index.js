import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import diary from './diary';

export default combineReducers({
    alert,
    auth,
    diary,
});
