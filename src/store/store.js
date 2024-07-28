import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import saga from './saga';
import rootAppReducer from './slices/rootSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        root: rootAppReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(saga);
