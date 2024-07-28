import {
    createRoutesFromElements,
    createBrowserRouter,
    RouterProvider,
    Route,
} from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux'
import NotFound from 'src/components/NotFound/NotFound';
import './App.scss';
import MainLayout from 'src/layouts/Main/Main';
import HomePage from 'src/pages/Home/Home';
import { store } from 'src/store/store';

const routes = createRoutesFromElements(
    <>
        <Route path='/' element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path='test/:id' element={<HomePage />} />
            <Route path='*' element={<NotFound />} />
        </Route>
    </>
);

const router = createBrowserRouter(routes);

function App() {
    return (
        <>
            <ReduxProvider store={store}>
                <RouterProvider router={router} />
            </ReduxProvider>
        </>
    )
}

export default App;
