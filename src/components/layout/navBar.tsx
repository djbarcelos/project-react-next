import {
  AppBar,
  Avatar,
  Badge,
  Button,
  ClickAwayListener,
  Divider,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  Popper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import Router from 'next/router';
import { NextPage } from 'next';

const NavBar: React.FC = () => {
  const [view, setView] = useState({
    propsMenuBar: {
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

  const handleClose = () => {
    setValue({ propsMenuBar: { open: false } });
  };

  const onCloseLogin = () => {
    Router.push('login');
  };

  const open = Boolean(view.propsMenuBar.open);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            style={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() =>
              setValue({ propsMenuBar: { open: !view.propsMenuBar.open } })
            }
          >
            <Badge badgeContent={0} color="secondary">
              <Avatar>
                <p>A</p>
              </Avatar>
            </Badge>
          </IconButton>
          <Popover
            id={id}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            style={
              {
                // marginTop: '15px',
                // backgroundColor: 'red',
              }
            }
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
          >
            <MenuList>
              <MenuItem disabled>Dashboard</MenuItem>
              <MenuItem disabled>Configuração</MenuItem>
              <Divider></Divider>
              <MenuItem onClick={onCloseLogin}>Sair</MenuItem>
            </MenuList>
          </Popover>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
