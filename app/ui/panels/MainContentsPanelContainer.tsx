import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import mainConfig from '../configs/MainConfigImpl';
import Table from '../components/Table';
import LoggerFactory from '../../libs/logger/LoggerFactory';

const log = LoggerFactory.getUILogger(__filename);

export default class MainContentsPanelContainer extends React.Component<
    {},
    {test: boolean}
> {
    constructor(props: {}) {
        super(props);

        this.state = {
            test: false
        }
    }

    render() {
        return (
            <div className={mainConfig.cssClassStyles}>
                <h1>Main Contents Panel</h1>
                <Table/>
            </div>
        );
    }
}
