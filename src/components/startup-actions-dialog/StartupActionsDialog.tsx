import './StartupActionsDialog.scss';
import {Button, Dialog, DialogContent, IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StartIcon from '@mui/icons-material/Start';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {useTranslation} from 'react-i18next';

interface StartupActionsDialogProps {
  open: boolean;
  onCancel: () => void;
  onStartNewGame: () => void;
}

export function shouldOpenStartUpDialog(): boolean {
  const lastLogin = 'lastLogin';
  const timeLimit = 1000* 60 * 60 * 4;
  const lastLoginString = localStorage.getItem(lastLogin);
  const now = new Date().getTime();
  localStorage.setItem(lastLogin, ''+now);
  return !lastLoginString || (+lastLoginString + timeLimit) < now;
}

export function StartupActionsDialog({open, onCancel, onStartNewGame}: StartupActionsDialogProps): React.JSX.Element {
  const {t} = useTranslation();

  return (
    <Dialog fullWidth={true} open={open} className="select-none" onClose={onCancel}>
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
          <Typography sx={{textAlign: 'center', fontWeight: 600}}> OR </Typography>
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
