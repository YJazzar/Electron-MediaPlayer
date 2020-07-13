import React from 'react';
import { render } from 'react-dom';
import LoggerFactory from './libs/logger/LoggerFactory';
import RootComponent from './ui/components/RootComponent'
import './styles/app.global.css';
import '../styles/test.css';

LoggerFactory.getUILogger(__filename).info("DOMContentLoaded was received... Adding RootContainer");

document.addEventListener('DOMContentLoaded', () =>
    render(
        <RootComponent/>,
        document.getElementById('root')
    )
);
