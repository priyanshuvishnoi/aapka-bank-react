import {
  Table,
  TableContainer,
  Container,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import useStyles from './styles';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../App';
import dayjs from 'dayjs';

type TransactionType = {
  to: string;
  from: string;
  money: number;
  createdAt: string;
};

type ManualTransactionType = {
  where: string;
  moneySpend: number;
};

function TransactionHistory() {
  const styles = useStyles();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [manualTransactions, setManualTransactions] = useState<
    ManualTransactionType[]
  >([]);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const { baseUrl } = config;
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);

  useEffect(() => {
    setLoading1(true);
    setLoading2(true);
    axios
      .get(baseUrl + 'wallet/getTransferMoneyHistory', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setTransactions(res.data.transferMoneyHistory);
        setLoading1(false);
        if (res.data.length === 0) {
          alert('You dont have any transactions');
          navigate('/');
        }
      })
      .catch(err => {
        alert(err.response.data.message);
        setLoading1(false);
      });

    axios
      .get(baseUrl + 'wallet/getTransactions', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setManualTransactions(res.data.transactions.transactions);
        setLoading2(false);
        if (res.data.length === 0) {
          alert('You dont have any transactions');
          navigate('/');
        }
      })
      .catch(err => {
        alert(err.response.data.message);
        setLoading2(false);
      });
  }, [baseUrl, navigate, token]);

  return (
    <main className={styles.main}>
      <div className={styles.heading}>Transaction History</div>
      <TableContainer component={Container}>
        {loading1 ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow className={styles.tableHead}>
                <TableCell>Your Account</TableCell>
                <TableCell align="right">Receiver Account </TableCell>
                <TableCell align="right">Amount&nbsp;(₹)</TableCell>
                <TableCell align="right">Date and Time&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
              {transactions
                .map(transaction => (
                  <TableRow
                    className={styles.tableRow}
                    key={transaction.createdAt}
                  >
                    <TableCell>{transaction.from}</TableCell>
                    <TableCell align="right">{transaction.to} </TableCell>
                    <TableCell align="right">{transaction.money}</TableCell>
                    <TableCell align="right">
                      {dayjs(transaction.createdAt)
                        .locale('en-in')
                        .format('DD-MM-YYYY hh:mm A')}
                    </TableCell>
                  </TableRow>
                ))
                .reverse()}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <div className={styles.heading}>Manual Transaction History</div>

      <TableContainer component={Container}>
        {loading2 ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow className={styles.tableHead}>
                <TableCell align="center">Where</TableCell>
                <TableCell align="center">Amount&nbsp;(₹)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
              {manualTransactions
                .map(transaction => (
                  <TableRow
                    className={styles.tableRow}
                    key={Date.now().toString()}
                  >
                    <TableCell align="center">{transaction.where}</TableCell>
                    <TableCell align="center">
                      {transaction.moneySpend}
                    </TableCell>
                  </TableRow>
                ))
                .reverse()}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </main>
  );
}

export default TransactionHistory;
