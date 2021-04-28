import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import NavBar from '../../layout/navBar';
import { Box, Container, Typography } from '@material-ui/core';
import BettingTabel from './bettingTable';
import Perfil from './perfil';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Container: {
      height: '80vh',
      padding: '0px',
    },
    Table: {},
  })
);

const CardDefault: React.FC = () => {
  const classes = useStyles();
  return (
    <Container className={classes.Container}>
      {/* <Perfil></Perfil> */}
      <BettingTabel></BettingTabel>
    </Container>
  );
};

export default CardDefault;
