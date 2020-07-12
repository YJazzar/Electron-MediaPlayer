
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {LoggerFactory} from "../libs/logger/LoggerFactory";

const log = LoggerFactory.getUILogger(__filename);

log.info("Now reading from a react script");

const Index = () => {
    log.info('Rendering main page');
    return <div>Hello React!</div>;
};

ReactDOM.render(<Index />, document.getElementById('app'));