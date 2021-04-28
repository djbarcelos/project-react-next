import * as React from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const Perfil: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Paper
        elevation={3}
        style={{ height: '200px', width: '33%', backgroundColor: 'white' }}
      ></Paper>
    </div>
  );
};

export default Perfil;
