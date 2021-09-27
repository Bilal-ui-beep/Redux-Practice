// import reducer from './bugs';
import reducer from './reducer';
// import logger from './middleware/logger';
// import func from './middleware/function';
import paramLogger from './middleware/logger';
import toast from './middleware/toast';
import api from './middleware/api';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// export default function () {
// 	return configureStore({
// 		reducer,
// 		middleware: [logger],
// 	});
// }

export default function () {
	return configureStore({
		reducer,
		middleware: [...getDefaultMiddleware(), paramLogger({ destination: 'console' }), toast, api],
	});
}
