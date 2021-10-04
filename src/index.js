import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import {Routes} from './components/routes/routes';
import {UserController} from "./controllers/user/user.controller";


ReactDOM.render(
    <React.StrictMode>
        <UserController>
            <Routes/>
        </UserController>
    </React.StrictMode>,
    document.getElementById('root')
);
