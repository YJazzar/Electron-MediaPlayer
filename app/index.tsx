import React from 'react';
import { render } from 'react-dom';
import './styles/app.global.css';
import LoggerFactory from './libs/logger/LoggerFactory';


const log = LoggerFactory.getUILogger(__filename);

document.addEventListener('DOMContentLoaded', () =>
    render(
        <h1>DOES THIS WORK???? PLEASE TELL ME IT DOES</h1>,
        document.getElementById('root')
    )
);
