import React from 'react';
import { render } from 'react-dom';
import LoggerFactory from './libs/logger/LoggerFactory';
import RootContainer from './ui/containers/RootContainer';
import UIEntry from './ui/UIEntry';

// import './ui/styles/test.global.css';

const log = LoggerFactory.getUILogger(__filename);
log.info('UI now starting to initialize');

document.addEventListener('DOMContentLoaded', initUI);

function initUI() {
    const ref = React.createRef<RootContainer>();

    render(<RootContainer ref={ref} />, document.getElementById('root'));

    new UIEntry(ref).init();
}
