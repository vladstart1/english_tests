import {combineReducers} from 'redux';
import questions from './questions_reducer';
import user from './user_reducer';

const rootReducer = combineReducers({
    questions,
    user
});

export default rootReducer;