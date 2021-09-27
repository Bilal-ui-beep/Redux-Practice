import reducer from './store/feature/reducer';

function createStore(reducer) {
	let state;
	let listeners = [];

	function subscribe(listener) {
		listeners.push(listener);
	}

	function dispatch(action) {
		state = reducer(state, action);

		for (let i = 0; i < listeners.length; i++) listeners[i]();
	}

	function getState() {
		return state;
	}

	return {
		getState,
		dispatch,
		subscribe,
	};
}

export default createStore(reducer);
