// basic saga
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit'
import { setModules } from './../slices/rootSlice';
import { fetchModules as apiFetchModules } from 'src/api/preference';

// worker saga
function* fetchModules(action) {
    const { payload } = action;
    const data = yield apiFetchModules(payload.id);
    yield put(setModules(data));
}

// watcher saga
export function* onFetchModules() {
    yield takeEvery('root/fetchModulesSaga', fetchModules);
}

export default function* counterSaga() {
    yield all([
        call(onFetchModules),
    ]);
};

export const sagaActions = {
    fetchModules: createAction('root/fetchModulesSaga'),
};
