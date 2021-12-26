import {
  Table,
  TableContainer,
  Container,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import useStyles from './styles';
import * as config from '../../config.json';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../App';
import dayjs from 'dayjs';

type TransactionType = {
  to: string;
  from: string;
  money: number;
  createdAt: string;
};

function TransactionHistory() {
  const styles = useStyles();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(false);
  const { baseUrl } = config;
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);

  useEffect(() => {
    axios
      .get(baseUrl + 'wallet/getTransferMoneyHistory', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setTransactions(res.data.transferMoneyHistory);
        setLoading(false);
        if (res.data.length === 0) {
          alert('You dont have any transactions');
          navigate('/');
        }
      })
      .catch(err => {
        alert(err.response.data.message);
        setLoading(false);
      });
  }, [baseUrl, navigate]);

  return (
    <main className={styles.main}>
      <div className={styles.heading}>Transaction History</div>
      <TableContainer component={Container}>
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
      </TableContainer>
    </main>
  );
}

export default TransactionHistory;
