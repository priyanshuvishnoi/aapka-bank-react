import React, { useContext, useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import config from '../../config';
import useStyles from './styles';
import { TokenContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function AddTransaction() {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [where, setWhere] = useState('');
  const [amount, setAmount] = useState(0);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const { baseUrl } = config;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = {
      moneySpend: amount,
      where: where,
    };

    try {
      await axios.post(baseUrl + 'wallet/transaction', formData, {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      alert('success');
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      }
    }
    setLoading(false);
  }

  return (
    <main className={styles.main}>
      <Paper className={styles.box}>
        <Typography variant="h1">Add Details</Typography>
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
            value={amount}
            label="Amount"
            type="number"
            className={styles.formInput}
            onChange={e => setAmount(parseInt(e.target.value))}
            required
          />
          <TextField
            value={where}
            label="Where"
            type="text"
            className={styles.formInput}
            onChange={e => setWhere(e.target.value)}
            required
          />
          <Button
            variant="contained"
            type="submit"
            className={loading ? '' : styles.button}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                style={{ color: '#fff', height: '40px', width: '40px' }}
              />
            ) : (
              'Add Details'
            )}
          </Button>
        </form>
      </Paper>
    </main>
  );
}

export default AddTransaction;
