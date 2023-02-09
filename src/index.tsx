import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from "./theme";
import {SnackbarProvider} from "notistack";
import {createRoot} from "react-dom/client";
import {migrate} from "./store/versioning";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import en from "./lang/en.json";
import de from "./lang/de.json";
import {checkVersion} from './store/version-checker';

const container = document.getElementById('root');
const root = createRoot(container!);
migrate();
checkVersion();

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
