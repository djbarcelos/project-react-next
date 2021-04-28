import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';

interface IAlertMessage {
  message: string;
  type?: any;
  open: boolean;
  onClose: any;
}

const AlertMessage: React.FC<IAlertMessage> = (props: IAlertMessage) => {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    props.onClose({ alert: { open: false } });
  };

  return (
    <>
      <Snackbar
        open={props.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert severity={props.type}>{props.message}</Alert>
      </Snackbar>
    </>
  );
};

export default AlertMessage;
