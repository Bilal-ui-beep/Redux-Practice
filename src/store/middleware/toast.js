const toast = (store) => (next) => (action) => {
	if (action.type === 'error') console.log('tostify: ', action.payload.message);
	else next(action);
};

export default toast;
