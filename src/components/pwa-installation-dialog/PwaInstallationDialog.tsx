import './PwaInstallationDialog.scss';
import React, {useEffect, useState} from 'react';
import {BeforeInstallPromptEvent} from '../../models/before-installed-prompt-event.model';
import {Button, Dialog, DialogContent, Fade, IconButton, Typography, Zoom} from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import SwipeUpOutlinedIcon from '@mui/icons-material/SwipeUpOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useTranslation} from 'react-i18next';

interface PwaInstallationDialogProps {
  open: boolean;
  onClose: () => void;
}

export function PwaInstallationDialog({open, onClose}: PwaInstallationDialogProps): JSX.Element {
  const [prompt, setPrompt] = useState<null | BeforeInstallPromptEvent>(null);
  const [userInstalled, setUserInstalled] = useState<boolean>(false);
  const [userAgent] = useState<string>(navigator.userAgent.toLowerCase());
  const {t} = useTranslation();

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const showInstallButton = userInstalled && !!prompt;

  const isIOS = /ipad|iphone|ipod/.test(userAgent);
  const isSafari = /safari/.test(userAgent);
  const showIOSHelp = isSafari && isIOS && !isStandalone;

  const isChrome = /chrome/.test(userAgent);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      setPrompt(event as BeforeInstallPromptEvent);
    });
    window.addEventListener('appinstalled', () => setUserInstalled(true));
  }, []);

  const addToHomeScreen = async (): Promise<void> => {
    if (!prompt) {
      return;
    }
    await prompt.prompt();
    const choiceResult = await prompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      setUserInstalled(true);
    }
  }

  if (!isStandalone && !userInstalled) {
    return (
      <Dialog fullWidth={true} open={open} className="select-none">
        <div className="dialog-header">
          <Typography variant="h5" className="title"> {t('pwaInstallation.installationGuide')} </Typography>
          <IconButton onClick={onClose}> <CloseIcon/> </IconButton>
        </div>
        <DialogContent>
          {showInstallButton && (
            <div>
              <Button onClick={addToHomeScreen} color="primary" variant="contained">
                {t('pwaInstallation.addAppToHomeScreen')}
              </Button>
            </div>
          )}
          {showIOSHelp && (
            <ol className="ordered-list">
              <li> {t('pwaInstallation.iosStep1Left')} &nbsp;<IosShareIcon/>&nbsp; {t('pwaInstallation.iosStep1Right')} </li>
              <li> {t('pwaInstallation.iosStep2')} &nbsp;<SwipeUpOutlinedIcon/></li>
              <li> {t('pwaInstallation.iosStep3')} &nbsp;<AddBoxOutlinedIcon/>'</li>
            </ol>
          )}
          {isChrome && (
            <ol className="ordered-list">
              <li> {t('pwaInstallation.androidStep1Left')} <MoreVertIcon/> {t('pwaInstallation.androidStep1Right')} </li>
              <li> {t('pwaInstallation.androidStep2')} &nbsp;<SwipeUpOutlinedIcon/></li>
              <li> {t('pwaInstallation.androidStep3Left')} '<AddToHomeScreenIcon/>&nbsp; {t('pwaInstallation.androidStep3Right')}' </li>
            </ol>
          )}
          {!showInstallButton && !showIOSHelp && !isChrome && (
            <div> {t('pwaInstallation.notSupportedBrowser')} </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }
  if (!isStandalone && userInstalled) {
    return (
      <Dialog fullWidth={true} open={open}>
        <div className="success-header">
          <IconButton onClick={onClose}> <CloseIcon/> </IconButton>
        </div>
        <div className="dialog-content">
          <Zoom in={true} style={{transitionDelay: '300ms'}}>
            <CheckCircleIcon style={{color: 'green', fontSize: '150px'}}/>
          </Zoom>
          <Fade in={true} style={{transitionDelay: '300ms'}}>
            <Typography variant="h6"> {t('pwaInstallation.appInstalled')} </Typography>
          </Fade>
        </div>
      </Dialog>
    );
  }
  return (
    <></>
  );
}
