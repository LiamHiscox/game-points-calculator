import './EditStepSizeDialog.scss';
import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, IconButton, TextField, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useTranslation} from 'react-i18next';

interface EditStepSizeDialogProps {
  open: boolean;
  stepSize: number;
  onCancel: () => void;
  onSave: (value: number) => void;
}

export function EditStepSizeDialog({
  open,
  stepSize,
  onCancel,
  onSave
}: EditStepSizeDialogProps): React.JSX.Element {
  const [editStepSize, setEditStepSize] = useState<number | null>(stepSize);
  const {t} = useTranslation();

  const handleSave = () => {
    if (editStepSize && editStepSize > 0) {
      onSave(editStepSize);
    }
  }

  const handleChange = (value: number) => {
    setEditStepSize(value > 0 ? value : null)
  }

  return (
    <Dialog fullWidth={true} open={open} className="select-none">
      <div className="dialog-header">
        <Typography variant="h5" className="title"> {t('stepSize.stepSizeHeader')} </Typography>
        <IconButton onClick={onCancel}> <CloseIcon/> </IconButton>
      </div>
      <DialogContent>
        <div className='buttons-container'>
          <Button variant={editStepSize == 1 ? 'contained' : 'outlined'} onClick={() => setEditStepSize(1)}> 1 </Button>
          <Button variant={editStepSize == 2 ? 'contained' : 'outlined'} onClick={() => setEditStepSize(2)}> 2 </Button>
          <Button variant={editStepSize == 5 ? 'contained' : 'outlined'} onClick={() => setEditStepSize(5)}> 5 </Button>
          <Button variant={editStepSize == 10 ? 'contained' : 'outlined'} onClick={() => setEditStepSize(10)}> 10 </Button>
          <Button variant={editStepSize == 20 ? 'contained' : 'outlined'} onClick={() => setEditStepSize(20)}> 20 </Button>
          <Button variant={editStepSize == 50 ? 'contained' : 'outlined'} onClick={() => setEditStepSize(50)}> 50 </Button>
          <Button variant={editStepSize == 100 ? 'contained' : 'outlined'} onClick={() => setEditStepSize(100)}> 100 </Button>
          <Button variant={editStepSize == 200 ? 'contained' : 'outlined'} onClick={() => setEditStepSize(200)}> 200 </Button>
          <Button variant={editStepSize == 500 ? 'contained' : 'outlined'} onClick={() => setEditStepSize(500)}> 500 </Button>
          <Button variant={editStepSize == 1000 ? 'contained' : 'outlined'} onClick={() => setEditStepSize(1000)}> 1000 </Button>
        </div>
        <TextField fullWidth type='number' value={editStepSize ?? ''} onChange={(e) => handleChange(+e.target.value)}/>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onCancel}> {t('common.cancel')} </Button>
        <Button color="primary"
                variant='contained'
                disabled={!editStepSize || editStepSize <= 0}
                onClick={handleSave}
        >
          {t('common.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
