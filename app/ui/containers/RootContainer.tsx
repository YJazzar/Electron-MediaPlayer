import React from 'react';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import mainConfig from '../configs/impl/MainConfigImpl';
import NavConfig from '../configs/impl/NavConfigImpl';
import playerConfig from '../configs/impl/PlayerControlsConfigImpl';
import { ContainerSize } from '../configs/PanelConfig';
import ResizableContainer from './ResizableContainer';

const log = LoggerFactory.getUILogger(__filename);

interface ContainerSizes {
    containerSizes?: ContainerSize[];
}

export default class RootContainer extends React.Component<{}, ContainerSizes> {
    constructor(props: {}) {
        super(props);
        this.state = {
            containerSizes: [],
        };
    }

    componentDidMount() {
        // setInterval(() => {
        //     log.info("Intervale is running");
        //     if (!mainConfig.temp)
        //         mainConfig.temp = 0;
        //     mainConfig.temp += 1;
        // }, 1000);
    }

    // Called by child components every time it mounts
    initSize(initSize: ContainerSize) {
        log.info(
            'A new resizable container has just called RootContainer.initSize()'
        );
        log.info(
            `Pushing to state: [${initSize.panelType}] width:[${initSize.width}] height:[${initSize.height}]`
        );

    }

    // Called by child components every time it is resized
    onResize(newSize: ContainerSize) {
        // console.log(`[${newSize.panelType}] [${newSize.width}] [${newSize.height}]`);
    }


    render() {
        log.info('Creating the rootContainer');

        return (
            <div className="resizableContainerWrapper">
                <ResizableContainer
                    {...NavConfig}
                    initSize={this.initSize.bind(this)}
                    onResize={this.onResize.bind(this)}
                />
                <ResizableContainer
                    {...mainConfig}
                    initSize={this.initSize.bind(this)}
                    onResize={this.onResize.bind(this)}
                />
                <ResizableContainer
                    {...playerConfig}
                    initSize={this.initSize.bind(this)}
                    onResize={this.onResize.bind(this)}
                />
            </div>
        );
    }
}
