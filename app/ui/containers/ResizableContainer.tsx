import React from 'react';
import { Resizable } from 're-resizable';
// import '../styles/app.global.css';
import '../styles/RootComponent.global.css'
// import ReactDOM from 'react-dom';

const style = {
    // display: 'float',
    // alignItems: 'center',
    // justifyContent: 'center',
    border: 'solid 1px #ddd',
    backgroundColor: '#f0f0f0',
};

export default class ResizableContainer extends React.Component<
    {
        id: string;
        className: string;
        panelType: string;
        defaultWidth: number;
        defaultHeight: number;
    },
    {}
> {
    render() {
        return (
            <div id={this.props.id} className={this.props.className}>
                <Resizable
                    style={style}
                    // defaultSize={{
                    //     width: this.props.defaultWidth,
                    //     height: this.props.defaultHeight,
                    // }}
                >
                    {this.props.panelType}
                </Resizable>
            </div>
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
