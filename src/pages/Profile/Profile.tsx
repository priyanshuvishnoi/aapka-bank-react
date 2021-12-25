import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from '@material-ui/core';
import { AccountCircle, Money } from '@material-ui/icons';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../../App';
import * as config from '../../config.json';
import useStyles from '../Login/styles';

function Profile() {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [dob, setDob] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [currentBalance, setCurrentBalance] = useState(0);
  const [addMoney, setAddMoney] = useState(0);
  const { token } = useContext(TokenContext);
  const { baseUrl } = config;

  useEffect(() => {
    setLoading(true);
    console.log(token);
    axios
      .get(baseUrl + 'wallet/getProfile', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setName(res.data.data.userDetails['name']);
        setEmail(res.data.data.userDetails['email']);
        setGender(res.data.data.userDetails['gender']);
        setDob(res.data.data.userDetails['dob']);
        setMobileNo(res.data.data.userDetails['mobileNo']);
        setAccountNo(res.data.data['accountNo']);
        setCurrentBalance(res.data.data['currentBalance']);
        setLoading(false);
      })
      .catch(err => console.log(err.response));
  }, [baseUrl, token]);

  function createData(name: string, value: string) {
    return { name, value };
  }

  const rows = [
    createData('Name', name),
    createData('Account no', accountNo),
    createData('Gender', gender),
    createData('Date Of Birth', dob),
    createData('Current Balance', `$${currentBalance}`),
    createData('Email', email),
    createData('Mobile no.', mobileNo),
  ];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddMoney = () => {
    const d = addMoney + currentBalance;

    const data = {
      currentBalance: addMoney,
    };
    axios
      .post(baseUrl + 'wallet/addMoney', data, {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then(res => {
        setCurrentBalance(d);
      })
      .catch(err => {
        alert(err.response.data.message);
      });
    setOpen(false);
  };

  return (
    <React.Fragment>
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <AccountCircle
            style={{
              color: '#F4A124',
              width: '1em',
              fontSize: '10.5em',
            }}
          />

          {loading === true ? (
            <span>
              <CircularProgress style={{ color: '#F4A124' }} />
            </span>
          ) : (
            <CardContent>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell
                      style={{ width: 160, fontSize: '1.8rem' }}
                      component="th"
                      scope="row"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        width: 260,
                        fontWeight: 'bold',
                        fontSize: '1.8rem',
                      }}
                    >
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </CardContent>
          )}
        </Card>

        <div>
          <Button
            style={{
              backgroundColor: '#F4A124',
              color: 'white',
              fontSize: '1.8rem',
              marginTop: '1rem',
            }}
            onClick={handleClickOpen}
          >
            <Money fontSize="large" /> &nbsp; Add Money
          </Button>
          <Dialog
            open={open}
            onClose={handleAddMoney}
            aria-labelledby="form-dialog-title"
            style={{ fontSize: '2rem' }}
          >
            <DialogTitle id="form-dialog-title" style={{ fontSize: '2rem' }}>
              Add Money
            </DialogTitle>
            <DialogContent>
              <DialogContentText style={{ fontSize: '2rem' }}>
                Add some money to your Wallet...
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                onChange={e => setAddMoney(parseInt(e.target.value))}
                label="Amount"
                type="number"
                fullWidth
                className={styles.formInput}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleAddMoney}
                color="primary"
                style={{ fontSize: '2rem' }}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </span>
    </React.Fragment>
  );
}

export default Profile;
