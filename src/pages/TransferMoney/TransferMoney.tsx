import {
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import useStyles from './styles';
import config from '../../config';
import { TokenContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function TransferMoney() {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState('');
  const [receiverAccount, setReceiverAccount] = useState('');
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const { baseUrl } = config;

  const fetchAccounts = useCallback(
    async function () {
      try {
        const res = await axios.get(baseUrl + 'wallet/getAllAccounts', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setAccounts(res.data.data);
        setCurrentAccount(res.data.currentAccount);
      } catch (error) {
        alert('Some error occurred!!');
        if (axios.isAxiosError(error)) {
          console.error(error);
        }
        navigate('/');
      }
    },
    [baseUrl, token, navigate]
  );

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      console.log(receiverAccount);
      const formData = {
        from: parseInt(currentAccount),
        to: parseInt(receiverAccount),
        money: amount,
      };

      await axios.post(baseUrl + 'wallet/transferMoney', formData, {
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
        <Typography variant="h1">Money Transfer</Typography>
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
            value={currentAccount}
            label="Your Account"
            type="text"
            className={styles.formInput}
            disabled
            required
          />
          <FormControl className={styles.formInput} required>
            <InputLabel id="demo-simple-select-label">
              Receiver Account
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={receiverAccount}
              onChange={e => setReceiverAccount(e.target.value as string)}
            >
              {accounts
                .filter((account: any) => account.accountNo !== currentAccount)
                .map((account: any) => (
                  <MenuItem value={account.accountNo} key={account.accountNo}>
                    {account.name + ' ' + account.accountNo}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            value={amount}
            label="Amount"
            type="number"
            className={styles.formInput}
            onChange={e => setAmount(parseInt(e.target.value))}
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
              'Transfer'
            )}
          </Button>
        </form>
      </Paper>
    </main>
  );
}

export default TransferMoney;
