import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Navigation';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/redux-store";
import './firebase'
import Navigation from './Navigation';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <HashRouter>
        <Provider store={store}>
            <Navigation/>
            {/*<App/>*/}
        </Provider>
    </HashRouter>
);
