import React from 'react';
import { render } from 'react-dom';
import LoggerFactory from './libs/logger/LoggerFactory';
import RootComponent from './ui/containers/RootContainer'
import './ui/styles/app.css';
// import './ui/styles/test.global.css';

const log = LoggerFactory.getUILogger(__filename);
log.info("UI now starting to initialize");


new UIEntry();

document.addEventListener('DOMContentLoaded', () =>
    render(
        <RootComponent/>,
        document.getElementById('root')
    )
);
