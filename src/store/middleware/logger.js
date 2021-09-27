// const logger = (store) => (next) => (action) => {
// 	console.log('store', store);
// 	console.log('next', next);
// 	console.log('action', action);
// 	next(action);
// };

// export default logger;

const paramLogger = (param) => (store) => (next) => (action) => {
	console.log('logging', param);
	next(action);
};

export default paramLogger;
