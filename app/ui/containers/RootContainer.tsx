import React from 'react';

import ResizableContainer from './ResizableContainer';
import mainConfig from '../configs/impl/MainConfigImpl';
import NavConfig from '../configs/impl/NavConfigImpl';
import playerConfig from '../configs/impl/PlayerControlsConfigImpl';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import { PanelType, ContainerSize } from '../configs/PanelConfig';

const log = LoggerFactory.getUILogger(__filename);

log.info('Creating the rootContainer');
export default class RootContainer extends React.Component<
    any,
    { containerSizes: ContainerSize[] }
> {
    componentDidMount() {
        // setInterval(() => {
        //     log.info("Intervale is running");
        //     if (!mainConfig.temp)
        //         mainConfig.temp = 0;
        //     mainConfig.temp += 1;
        // }, 1000);
    }

    initSize(initSize: ContainerSize) {
        log.info(
            'A new resizable container has just called RootContainer.initSize()'
        );
        log.info(
            `Pushing to state: [${initSize.panelType}] width:[${initSize.width}] height:[${initSize.height}]`
        );
    }

    onResize() {}

    render() {
        return (
            <div className="resizableContainerWrapper">
                <ResizableContainer
                    {...NavConfig}
                    initSize={this.initSize.bind(this)}
                />
                <ResizableContainer
                    {...mainConfig}
                    initSize={this.initSize.bind(this)}
                />
                <ResizableContainer
                    {...playerConfig}
                    initSize={this.initSize.bind(this)}
                />
            </div>
        );
    }
}
