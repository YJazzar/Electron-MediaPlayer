import React from 'react';
import { render } from 'react-dom';
import LoggerFactory from './libs/logger/LoggerFactory';
import RootComponent from './ui/containers/RootContainer'
import './ui/styles/app.css';
// import './ui/styles/test.global.css';

LoggerFactory.getUILogger(__filename).info("DOMContentLoaded was received... Adding RootContainer");

document.addEventListener('DOMContentLoaded', () =>
    render(
        <RootComponent/>,
        document.getElementById('root')
    )
);
