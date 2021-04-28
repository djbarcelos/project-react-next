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
import styles from '../../../../styles/view/Login.module.css';
import api from '../../../../utils/api';
import AlertMessage from '../../util/ AlertMessage';
import Copyright from '../../util/Copyright';

interface IloginView {
  defaultValue?: string;
}

const LoginView: React.FC<IloginView> = (props: IloginView) => {
  const [view, setView] = useState({
    user: '',
    password: '',
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
    setValue({ [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setValue({ propsPag: { loading: true } });
    try {
      const data = await axios
        .post('/api/Auth', {
          user: view.user,
          password: view.password,
        })
        .then(function (auth) {
          return auth.data;
        })
        .catch(function (error) {
          console.log(error);
        });

      console.log(data);
      authIsConnecting(data.status);
    } catch (error) {
      setValue({
        alert: {
          type: 'warning',
          open: true,
          message: 'Usuario ou senha invalido!',
        },
        propsPag: { loading: false },
      });
    }
  };

  function authIsConnecting(data) {
    setValue({
      alert: {
        type: 'success',
        open: true,
        message: 'Logado com sucesso!',
      },
    });
    Router.push('/');
  }

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
              label="Usuário"
              onChange={handleInputChange}
              name="user"
              // variant="filled"
              margin="normal"
              required
              autoFocus
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
                Entrar
              </Button>
            </div>
          </form>
          <div className={styles.utilLogin}>
            <Link href="/login/criar">{'Criar uma conta.'}</Link>
            <Link href="#">{'Esqueci minha senha.'}</Link>
          </div>
        </div>
        <Box mt={12}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default LoginView;
