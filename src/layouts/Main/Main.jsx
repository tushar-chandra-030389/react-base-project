import { Outlet } from 'react-router-dom';
import style from './main.module.scss';

function Main() {
    return (
        <div>
            <div>Header</div>
            <div>{<Outlet />}</div>
            <div>Footer</div>
        </div>
    );
}

export default Main;
