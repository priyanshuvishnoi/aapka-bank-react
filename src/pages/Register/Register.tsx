import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress } from 'react-cssfx-loading';
import axios from 'axios';
import useStyles from './styles';
import config from '../../config';
import { ResponseError, TokenContext } from '../../App';
import { Navigate, useNavigate } from 'react-router-dom';

function Register() {
  const styles = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState(' ');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateCookie, token, deleteCookie } = useContext(TokenContext);
  const navigate = useNavigate();
  const { baseUrl } = config;

  useEffect(() => deleteCookie!(), []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);

      return;
    }
    setError('');

    const data = {
      email,
      password,
      name,
      gender,
      mobileNo: mobile,
      passwordConfirm: confirmPassword,
    };

    try {
      const response = await axios.post(baseUrl + 'user/register', data);
      console.log(response);

      await axios.post(
        baseUrl + 'wallet/addMoney',
        {
          currentBalance: 100,
        },
        {
          headers: {
            authorization: `Bearer ${response.data.token}`,
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      );
      updateCookie!(response.data.token);
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
            value={name}
            label="Name"
            type="text"
            helperText="Enter your full name"
            className={styles.formInput}
            onChange={e => setName(e.target.value)}
            required
          />
          <TextField
            value={email}
            label="Email"
            type="email"
            helperText="user@example.xyz"
            className={styles.formInput}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <FormControl className={styles.formInput} required>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              onChange={e =>
                setGender(e.target.value as '' | 'male' | 'female')
              }
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
            </Select>
          </FormControl>

          <TextField
            value={date}
            label="Date of Birth"
            type="date"
            placeholder="dd/mm/yyyy"
            className={styles.formInput}
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            value={mobile}
            label="Phone"
            type="text"
            helperText="must be 10 digits"
            className={styles.formInput}
            onChange={e => setMobile(e.target.value)}
            required
          />
          <TextField
            value={password}
            label="Password"
            type="password"
            helperText="must be at least 8 characters"
            className={styles.formInput}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <TextField
            value={confirmPassword}
            label="Confirm Password"
            type="password"
            helperText="must be same as above"
            className={styles.formInput}
            onChange={e => setConfirmPassword(e.target.value)}
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
              'Register'
            )}
          </Button>
        </form>
        <Button
          className={styles.redirectButton}
          onClick={_ => {
            navigate('/login');
          }}
        >
          Already have an account?
        </Button>
      </Paper>
    </main>
  );
}

export default Register;
