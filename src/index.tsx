import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from './theme';
import {SnackbarProvider} from 'notistack';
import {createRoot} from 'react-dom/client';
import {migrate} from './store/versioning';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './lang/en.json';
import de from './lang/de.json';
import {checkVersion} from './store/version-checker';

interface VirtualKeyboardApi {
  overlaysContent: boolean;
}

(async (): Promise<void> => {
  if (navigator.storage && navigator.storage.persist) {
    await navigator.storage.persist();
  }
  await migrate();
  checkVersion();

  if ('virtualKeyboard' in navigator) {
    (navigator.virtualKeyboard as VirtualKeyboardApi).overlaysContent = true;
  }

  const container = document.getElementById('root');
  // eslint-disable-next-line
  const root = createRoot(container!);
  
  i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        de: {
          translation: de
        },
        en: {
          translation: en
        }
      },
      fallbackLng: 'en',
      supportedLngs: ['en', 'de'],
      nonExplicitSupportedLngs: true,
      interpolation: {
        escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      }
    });
  
  root.render(
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
  );
  
  serviceWorkerRegistration.register();
})();

