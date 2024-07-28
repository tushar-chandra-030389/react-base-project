// root saga
import { all, call } from 'redux-saga/effects';
import rootSage from './saga/rootSaga';

export default function* rootSaga() {
    yield all([
        call(rootSage),
    ]);
}
