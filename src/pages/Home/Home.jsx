import { useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectLoadingState,
    selectPreference,
    selectAdminModules,
    loaded,
    refresh,
    getPreference
} from 'src/store/slices/rootSlice';
import { sagaActions } from 'src/store/saga/rootSaga';
import TextEditor from 'src/components/TextEditor/TextEditor';
import style from './home.module.scss';


function Home() {
    return <TextEditor />
}

export default Home;
