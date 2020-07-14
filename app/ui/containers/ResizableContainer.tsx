import React from 'react';
import { Resizable } from 're-resizable';
import '../styles/RootComponent.global.css';
import { PanelConfig } from '../configs/PanelConfig';

/**
 * Vars not used that are defined in PanelConfig:
 *      - id
 */
export default class ResizableContainer extends React.Component<PanelConfig,{}> {
    render() {
        return (
            // <div id={this.props.id} className={this.props.className}>
            <Resizable
                className={`${this.props.className} ${this.props.classStyles}`}
                defaultSize={{
                    width: this.props.defaultSize.defaultWidth,
                    height: this.props.defaultSize.defaultHeight,
                }}
                enable={this.props.resizableSides}
            >
                {this.props.panelType}
                {this.props.panelName}
                {this.props.element}
            </Resizable>
            // </div>
        );
    }
}

// <Resizable
//     style={styles.playerControlsPanel}
//     defaultSize={{
//         width: sizes.playerControlsPanel.defaultWidth,
//         height: sizes.playerControlsPanel.defaultHeight,
//     }}
// >
//     player panel (bottom side)
// </Resizable>
