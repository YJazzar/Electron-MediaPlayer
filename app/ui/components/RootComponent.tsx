import React from 'react';
import ResizableContainer from '../containers/ResizableContainer';
import '../styles/app.global.css';
// import ReactDOM from 'react-dom';

const styles = {
    navPanel: {
        display: 'float',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'solid 1px #ddd',
        background: '#f0f0f0',
    },
    mainPanel: {
        display: 'float',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'solid 1px #ddd',
        background: '#f0f0f0',
    },
    playerControlsPanel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'solid 1px #ddd',
        background: '#f0f0f0',
    },
};

const sizes = {
    navPanel: {
        defaultWidth: window.innerWidth * 0.99 * 0.2,
        defaultHeight: window.innerHeight * 0.99,
    },
    mainPanel: {
        defaultWidth: window.innerWidth * 0.99 - window.innerWidth * 0.1,
        defaultHeight: window.innerHeight * 0.99,
    },
    playerControlsPanel: {
        defaultWidth: window.innerWidth * 0.99 * 0.8,
        defaultHeight: window.innerHeight * 0.99 * 0.8,
    },
};

export default class RootComponent extends React.Component {
    render() {
        return (
            <div className="resizableContainerWrapper">
                <ResizableContainer
                    id="nav-panel-id"
                    className="floatLeft"
                    panelType="This is the nav panel"
                    defaultWidth={sizes.navPanel.defaultWidth}
                    defaultHeight={sizes.navPanel.defaultHeight}
                />
                {/* <ResizableContainer
                    id="main-contents-panel-id"
                    className="floatRight"
                    panelType="This is the main panel"
                    defaultWidth={sizes.mainPanel.defaultWidth}
                    defaultHeight={sizes.mainPanel.defaultHeight}
                /> */}
            </div>
        );
    }
}
// export default class RootComponent extends React.Component {
//     render() {
//         return (
//             <div>
//                 <ResizableContainer
//                     id="nav-panel-id"
//                     panelType="This is the nav panel"
//                     defaultWidth={sizes.navPanel.defaultWidth}
//                     defaultHeight={sizes.navPanel.defaultHeight}
//                 />
//             </div>
//         );
//     }
// }

// <div>
//                 <div className={cssStyles.nav}>
//                     <Resizable
//                         style={styles.navPanel}
//                         defaultSize={{
//                             width: sizes.navPanel.defaultWidth,
//                             height: sizes.navPanel.defaultHeight,
//                         }}
//                     >
//                         nav Panel (left side)
//                     </Resizable>
//                 </div>
//                 <div className={cssStyles.main}>
//                     <Resizable
//                         style={styles.mainPanel}
//                         size={{
//                             width: sizes.mainPanel.defaultWidth,
//                             height: sizes.mainPanel.defaultHeight,
//                         }}
//                     >
//                         Main panel (track explorer)
//                     </Resizable>
//                 </div>
//             </div>
// <Resizable
//     style={styles.playerControlsPanel}
//     defaultSize={{
//         width: sizes.playerControlsPanel.defaultWidth,
//         height: sizes.playerControlsPanel.defaultHeight,
//     }}
// >
//     player panel (bottom side)
// </Resizable>
