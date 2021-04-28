import { Link, Typography } from '@material-ui/core';
import React from 'react';

const Copyright: React.FC = () => {
  return (
    <>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="inherit" href="/">
          {'System'}
        </Link>{' '}
        <b>{'Copyright © '}</b>
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  );
};

export default Copyright;
