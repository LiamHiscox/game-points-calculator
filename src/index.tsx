import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from "./theme";
import {SnackbarProvider} from "notistack";
import {createRoot} from "react-dom/client";

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={1}
        dense={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <App/>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();

