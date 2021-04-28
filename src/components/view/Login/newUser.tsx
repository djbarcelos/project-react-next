import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  TextField,
} from '@material-ui/core';
import axios from 'axios';
import Router from 'next/router';
import { error } from 'node:console';
import { config } from 'node:process';
import React, { FormEvent, useCallback, useState } from 'react';
import useSWR from 'swr';
import user from '../../../../pages/api/user';
import styles from '../../../../styles/view/Login.module.css';
import api from '../../../../utils/api';
import AlertMessage from '../../util/ AlertMessage';
import Copyright from '../../util/Copyright';

interface INewUser {
  defaultValue?: string;
}

const NewUser: React.FC<INewUser> = (props: INewUser) => {
  const [view, setView] = useState({
    user: {
      name: '',
      email: '',
      username: '',
      password: '',
    },
    alert: {
      open: false,
      message: null,
      type: null,
    },
    propsPag: {
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

  const handleInputChange = (event: any) => {
    setValue({
      user: { ...view.user, [event.target.name]: event.target.value },
    });
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setValue({ propsPag: { loading: true } });
    const { name, email, username, password } = view.user;

    try {
      const data = await axios
        .post('/api/user', {
          name,
          email,
          username,
          password,
        })
        .then(function (auth) {
          return auth.data;
        })
        .catch(function (error) {
          console.log(error);
        });

      if (data.sucess.code === 201) {
        Router.push('/login');
      }
    } catch (error) {
      setValue({ propsPag: { loading: false } });
      console.error(error);
    }
  };

  return (
    <>
      <AlertMessage
        open={view.alert.open}
        onClose={setValue}
        type={view.alert.type}
        message={view.alert.message}
      ></AlertMessage>
      <Container className={styles.box}>
        <Avatar className={styles.avatarLogin}></Avatar>
        <div className={styles.boxLogin}>
          <form onSubmit={onSubmit}>
            <TextField
              fullWidth
              label="Nome"
              onChange={handleInputChange}
              name="name"
              // variant="outlined"
              margin="normal"
              required
              autoFocus
            ></TextField>
            <TextField
              fullWidth
              label="Email"
              onChange={handleInputChange}
              name="email"
              // variant="outlined"
              margin="normal"
              required
            ></TextField>
            <TextField
              fullWidth
              label="Usuario"
              onChange={handleInputChange}
              name="username"
              // variant="outlined"
              margin="normal"
              required
            ></TextField>
            <TextField
              fullWidth
              label="Senha"
              onChange={handleInputChange}
              name="password"
              // variant="outlined"
              margin="normal"
              required
              type="password"
            ></TextField>
            <div className={styles.buttonLogin}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                startIcon={
                  <>
                    {view.propsPag.loading && (
                      <CircularProgress
                        size={24}
                        className={styles.buttonProgress}
                      />
                    )}
                  </>
                }
                disabled={view.propsPag.loading}
              >
                Criar
              </Button>
            </div>
            <div className={styles.utilLogin}>
              <Link href="/login">{'VOLTAR'}</Link>
            </div>
          </form>
        </div>
        <Box mt={12}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default NewUser;
