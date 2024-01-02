import './StartupActionsDialog.scss';
import {Button, Dialog, DialogContent, IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StartIcon from '@mui/icons-material/Start';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {useTranslation} from 'react-i18next';
import { useEffect } from 'react';

interface StartupActionsDialogProps {
  open: boolean;
  onCancel: () => void;
  onStartNewGame: () => void;
}

export function StartupActionsDialog({open, onCancel, onStartNewGame}: StartupActionsDialogProps): JSX.Element {
  const {t} = useTranslation();
  const lastLogin = 'lastLogin';
  const timeLimit = 1000* 60 * 60 * 4;

  useEffect(() => {
    const lastLoginString = localStorage.getItem(lastLogin);
    const now = new Date().getTime();
    if (lastLoginString && +lastLoginString + timeLimit > now) {
      onCancel();
    }
    localStorage.setItem(lastLogin, ''+now);
  }, []);

  return (
    <Dialog fullWidth={true} open={open} className="select-none">
      <div className="dialog-header">
        <Typography variant="h5" className="title"> {t('startupActions.welcome')} </Typography>
        <IconButton onClick={onCancel}> <CloseIcon/> </IconButton>
      </div>
      <DialogContent>
        <div className='button-container'>
          <Button onClick={onStartNewGame}
                  variant='contained'
                  startIcon={<StartIcon/>}
                  fullWidth>
            {t('startupActions.startNewGame')}
          </Button>
          <Typography textAlign='center' fontWeight={600}> OR </Typography>
          <Button onClick={onCancel}
                  variant='contained'
                  startIcon={<KeyboardReturnIcon/>}
                  fullWidth>
            {t('startupActions.continueCurrent')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
