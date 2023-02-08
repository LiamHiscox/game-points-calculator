import './PwaInstallationDialog.scss';
import React, {useEffect, useState} from 'react';
import {BeforeInstallPromptEvent} from '../../models/before-installed-prompt-event.model';
import {Button, Dialog, DialogContent, Fade, IconButton, Typography, Zoom} from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import SwipeUpOutlinedIcon from '@mui/icons-material/SwipeUpOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {UpTransition} from '../up-transition/UpTransition';

interface PwaInstallationDialogProps {
  open: boolean;
  onClose: () => void;
}

export function PwaInstallationDialog({open, onClose}: PwaInstallationDialogProps) {
  const [prompt, setPrompt] = useState<null | BeforeInstallPromptEvent>(null);
  const [userInstalled, setUserInstalled] = useState<boolean>(false);
  const [userAgent] = useState<string>(navigator.userAgent.toLowerCase());

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const showInstallButton = userInstalled && !!prompt;

  const isIOS = /ipad|iphone|ipod/.test(userAgent);
  const isSafari = /safari/.test(userAgent);
  const showIOSHelp = isSafari && isIOS && !isStandalone;

  const isChrome = /chrome/.test(userAgent);
  const isFirefox = /firefox/.test(userAgent);

  const showAndroidHelp = isChrome || isFirefox;

  const isEdgeAndroid = /edga/.test(userAgent);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      setPrompt(event as BeforeInstallPromptEvent);
    });
    window.addEventListener('appinstalled', () => setUserInstalled(true));
  }, []);

  const addToHomeScreen = async () => {
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
      <Dialog fullWidth={true} open={open} TransitionComponent={UpTransition}>
        <div className="dialog-header">
          <Typography variant="h5" className="title"> Installation Guide </Typography>
          <IconButton onClick={onClose}> <CloseIcon/> </IconButton>
        </div>
        <DialogContent>
          {showInstallButton && (
            <div>
              <Button onClick={addToHomeScreen} color="primary" variant="contained">
                Add App To Home Screen
              </Button>
            </div>
          )}
          {showIOSHelp && (
            <ol className="ordered-list">
              <li> While viewing the website, tap the &nbsp;<IosShareIcon/>&nbsp; button in the menu bar </li>
              <li> Scroll down the list of options &nbsp;<SwipeUpOutlinedIcon/></li>
              <li> Tap 'Add to Home Screen &nbsp;<AddBoxOutlinedIcon/>'</li>
            </ol>
          )}
          {showAndroidHelp && (
            <ol className="ordered-list">
              <li> While viewing the website, tap the <MoreVertIcon/> button next to the URL bar</li>
              <li> Scroll down the list of options &nbsp;<SwipeUpOutlinedIcon/></li>
              <li> Tap '<AddToHomeScreenIcon/>&nbsp; Install app' or 'Install'</li>
            </ol>
          )}
          {isEdgeAndroid && (
            <ol className="ordered-list">
              <li> While viewing the website, tap the &nbsp;<MoreHorizIcon/>&nbsp; in the menu bar</li>
              <li> Swipe left the list of options &nbsp;<SwipeLeftIcon/></li>
              <li> Tap 'Add to home screen'</li>
            </ol>
          )}
          {!showInstallButton && !showIOSHelp && !showAndroidHelp && !isEdgeAndroid && (
            <div> This app only supports Safari on IOS and Chrome, Firefox and Edge on Android devices! </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }
  if (!isStandalone && userInstalled) {
    return (
      <Dialog fullWidth={true} open={open} TransitionComponent={UpTransition}>
        <div className="success-header">
          <IconButton onClick={onClose}> <CloseIcon/> </IconButton>
        </div>
        <div className="dialog-content">
          <Zoom in={true} style={{transitionDelay: '300ms'}}>
            <CheckCircleIcon style={{color: 'green', fontSize: '150px'}}/>
          </Zoom>
          <Fade in={true} style={{transitionDelay: '300ms'}}>
            <Typography variant="h6"> App installed </Typography>
          </Fade>
        </div>
      </Dialog>
    );
  }
  return (
    <></>
  );
}
