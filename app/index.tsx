import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { render } from 'react-dom';
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
        }
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
