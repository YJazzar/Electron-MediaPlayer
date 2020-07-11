
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {LoggerFactory} from "../libs/logger/LoggerFactory";

const log = LoggerFactory.getUILogger(__filename);

log.info('now logging from the front end part of the software')

const Index = () => {
    return <div>Hello React!</div>;
};

ReactDOM.render(<Index />, document.getElementById('app'));