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
import style from './home.module.scss';

function Home() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoadingState);
    const preference = useSelector(selectPreference);
    const adminModules = useSelector((state) => selectAdminModules(state));

    useEffect(() => {
        dispatch(loaded());

        async function fetchPreference() {
            await dispatch(getPreference({id: 10})).unwrap();
        }

        async function fetchModules() {
            dispatch(sagaActions.fetchModules({id: 10}));
        }

        fetchPreference();
        fetchModules();

        return () => {
            dispatch(refresh());
        };
    }, []);

    return (
        <div>
            {`Home ${isLoading} ${preference.theme}`}
            <ul>
                {adminModules.map((module, index) => {
                    return (
                        <li key={index}>{module.name}</li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Home;
