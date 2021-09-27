import { combineReducers } from 'redux';
import bugsReducer from './bugs';
import projectsReducer from './project';
import usersReducer from './user';

export default combineReducers({
	bugs: bugsReducer,
	projects: projectsReducer,
	users: usersReducer,
});
