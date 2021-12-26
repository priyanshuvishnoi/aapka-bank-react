import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress } from 'react-cssfx-loading';
import axios from 'axios';
import useStyles from './styles';
import config from '../../config';
import { ResponseError, TokenContext } from '../../App';
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
  const styles = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateCookie, token } = useContext(TokenContext);
  const navigate = useNavigate();
  const { baseUrl } = config;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const data = { email, password };

    try {
      const response = await axios.post(baseUrl + 'user/login', data);
      console.log(response);
      updateCookie!(response.data.token);
      // setToken!(response.data.token);
      navigate('/');
    } catch (err: any) {
      const error = err.response.data as ResponseError;
      setError(error.message);
    }
    setLoading(false);
  }

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <main className={styles.main}>
      <Paper className={styles.box}>
        <Typography variant="h1">Aapka Bank</Typography>
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && (
            <Alert
              severity="error"
              style={{
                fontSize: '1.5rem',
                backgroundColor: '#df465577',
                color: '#fff',
              }}
            >
              {error}
            </Alert>
          )}
          <TextField
            value={email}
            label="email"
            type="email"
            helperText="user@example.xyz"
            className={styles.formInput}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <TextField
            value={password}
            label="password"
            type="password"
            helperText="must be at least 8 characters"
            className={styles.formInput}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button
            variant="contained"
            type="submit"
            className={loading ? '' : styles.button}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="#fff" height="40px" width="40px" />
            ) : (
              'Login'
            )}
          </Button>
        </form>
        <Button
          className={styles.redirectButton}
          onClick={_ => {
            navigate('/register');
          }}
        >
          Create new account
        </Button>
      </Paper>
    </main>
  );
}

export default Login;
