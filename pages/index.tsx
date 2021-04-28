import { Box, Paper } from '@material-ui/core';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Copyright from '../src/components/util/Copyright';
import CardDefault from '../src/components/view/dashboard/cardDefault';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import BettingTabel from '../src/components/view/dashboard/bettingTable';
import axios from 'axios';
import map from '../utils/map';
import NavBar from '../src/components/layout/navBar';

const IndexPage: NextPage = () => {
  useEffect(() => {
    return;
  }, []);

  const [view, setView] = useState({
    dataUsers: [],
    propsPag: {
      open: false,
      loading: false,
    },
  });

  const setValue = (props: any) => {
    setView((oldValues: any) => {
      return {
        ...oldValues,
        ...props,
      };
    });
  };

  return (
    <div>
      <main>
        <NavBar></NavBar>
        <div style={{ marginTop: '80px' }}></div>
        <Box mt={12}>
          <BettingTabel dataValues={[]}></BettingTabel>
        </Box>
        <Box mt={12} style={{ marginTop: '10px' }}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
};

export default IndexPage;
