import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {MuiThemeProvider} from '@material-ui/core';
import {theme} from "./theme";
import {SnackbarProvider} from "notistack";

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={1}
                        dense={true}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
      >
        <App/>
      </SnackbarProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

