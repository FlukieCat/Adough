import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import diary from './diary';
import setting from './setting';

export default combineReducers({
    alert,
    auth,
    diary,
    setting,
});
