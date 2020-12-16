import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import LoggerFactory from './libs/logger/LoggerFactory';
import RootContainer from './ui/containers/RootContainer';
import UIController from './ui/controllers/UIController';
import UIEntry from './ui/UIEntry';

// import './ui/styles/test.global.css';

const log = LoggerFactory.getUILogger(__filename);
log.debug('UI now starting to initialize');

document.addEventListener('DOMContentLoaded', initUI);

function initUI() {
    const ref = React.createRef<RootContainer>();

    const theme = createMuiTheme({
        palette: {
            type: UIController.getInstance().getThemeName() === 'dark' ? 'dark' : 'light',
            primary: blue,
            secondary: red,
        },
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    '*::-webkit-scrollbar': {
                        width: '5px',
                        height: '5px',
                    },
                    '*::-webkit-scrollbar-track': {
                        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
                        borderRadius: '10px',
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgb(56, 139, 255)',
                        borderRadius: '10px',
                        outline: '1px solid slategrey',
                    },
                },
            },
        },
    });

    const UIBase = (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RootContainer ref={ref} />
        </ThemeProvider>
    );

    render(UIBase, document.getElementById('root'));

    new UIEntry(ref);
}
