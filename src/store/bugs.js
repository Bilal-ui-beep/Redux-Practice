import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import moment from 'moment';

const slice = createSlice({
	name: 'bugs',
	initialState: {
		list: [],
		loading: false,
		lastFetch: null,
	},
	reducers: {
		bugsRequestFailed: (bugs, action) => {
			bugs.loading = false;
		},
		bugsRequested: (bugs, action) => {
			bugs.loading = true;
		},
		bugsReceived: (bugs, action) => {
			bugs.list = action.payload;
			bugs.loading = false;
			bugs.lastFetch = Date.now();
		},
		bugAssignedToUser: (bugs, action) => {
			const { id: bugId, userId } = action.payload;
			const index = bugs.list.findIndex((bug) => bug.id === bugId);
			bugs.list[index].userId = userId;
		},
		bugAdded: (bugs, action) => {
			bugs.list.push(action.payload);
		},

		bugResolved: (bugs, action) => {
			const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
			bugs.list[index].resolved = true;
		},

		bugRemoved: (bugs, action) => {
			const index = bugs.list.filter((bug) => bug.id !== action.payload.id);
		},
	},
});

export const { bugAdded, bugsRequested, bugsRequestFailed, bugResolved, bugRemoved, bugAssignedToUser, bugsReceived } = slice.actions;
export default slice.reducer;

// Action Creators

const url = '/bugs';

// () => {}

export const loadBugs = () => (dispatch, getState) => {
	const { lastFetch } = getState().entities.bugs;

	const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');

	if (diffInMinutes < 10) return;

	dispatch(
		apiCallBegan({
			url,
			onStart: bugsRequested.type,
			onSuccess: bugsReceived.type,
			onError: bugsRequestFailed.type,
		}),
	);
};

export const addBug = (bug) =>
	apiCallBegan({
		url,
		method: 'post',
		data: bug,
		onSuccess: bugAdded.type,
	});

// export const getUnresolvedBugs = (state) => state.entities.bugs.filter((bug) => !bug.resolved);

export const assignBugToUser = (bugId, userId) =>
	apiCallBegan({
		url: url + '/' + bugId,
		method: 'patch',
		data: { userId },
		onSuccess: bugAssignedToUser.type,
	});

export const getBugsByUser = (userId) =>
	createSelector(
		(state) => state.entities.bugs,
		(bugs) => bugs.filter((bug) => bug.userId === userId),
	);

export const resolveBug = (id) =>
	apiCallBegan({
		url: url + '/' + id,
		method: 'patch',
		data: { resolved: true },
		onSuccess: bugResolved.type,
	});
export const getUnresolvedBugs = createSelector(
	(state) => state.entities.bugs,
	(state) => state.entities.projects,
	(bugs, projects) => (bugs, projects).filter((bug, project) => !(bug, project).resolved),
);

// Action Creators

// export const bugAdded = createAction('bugAdded');
// export const bugResolved = createAction('bugResolved');
// export const bugRemoved = createAction('bugRemoved');

// Reducer

// let lastId = 0;

// export default createReducer([], {
// 	// key: value
// 	// actions: functions (event => event handler)
// 	[bugAdded.type]: (bugs, action) => {
// 		bugs.push({
// 			id: ++lastId,
// 			description: action.payload.description,
// 			resolved: false,
// 		});
// 	},

// 	[bugResolved.type]: (bugs, action) => {
// 		const index = bugs.findIndex((bug) => bug.id === action.payload.id);
// 		bugs[index].resolved = true;
// 	},

// 	[bugRemoved.type]: (bugs, action) => {
// 		const index = bugs.filter((bug) => bug.id !== action.payload.id);
// 	},
// });

// export default function reducer(state = [], action) {
// 	switch (action.type) {
// 		case bugAdded.type:
// 			return [
// 				...state,
// 				{
// 					id: ++lastId,
// 					description: action.payload.description,
// 					resolved: false,
// 				},
// 			];
// 		case bugResolved.type:
// 			return state.map((bug) =>
// 				bug.id !== action.payload.id
// 					? bug
// 					: {
// 							...bug,
// 							resolved: true,
// 					  },
// 			);

// 		case bugRemoved.type:
// 			return state.filter((bug) => bug.id !== action.payload.id);
// 		default:
// 			return state;
// 	}
// }
