import { Container, Grid, Button, Paper } from '@material-ui/core';
import React, { useContext } from 'react';
import {
  AttachMoney,
  ArrowDownward,
  History,
  Receipt,
} from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../App';
import BankSvg from '../../assets/Bank.svg';
import useStyles from './styles';

function Home() {
  const navigate = useNavigate();
  const styles = useStyles();
  return (
    <main>
      <header className={styles.header}>
        <div>
          <img src={BankSvg} alt="Bank" height={100} width={100} />
        </div>
        <div>
          <h1 className={styles.heading}>
            Welcome to Aapka Bank! <br />
            <span className={styles.slogan}>Aapke Paise, Hamare Paise...</span>
          </h1>
        </div>
      </header>
      <Container className={styles.container}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <div style={{ padding: '30px' }}>
              <Button onClick={() => navigate('transfer')}>
                <Grid key={0} item>
                  <Paper
                    className={styles.paper}
                    elevation={5}
                    style={{ marginTop: '50px', backgroundColor: '#F4A124' }}
                  >
                    <span>
                      {' '}
                      <AttachMoney
                        style={{
                          color: 'white',
                          width: '1em',
                          fontSize: '10.5em',
                        }}
                      />
                      <h1
                        style={{
                          color: 'white',
                        }}
                      >
                        Make Transaction
                      </h1>
                    </span>
                  </Paper>
                </Grid>
              </Button>
            </div>
            <div style={{ padding: '30px' }}>
              <Button onClick={() => navigate('addTransaction')}>
                <Grid key={1} item>
                  <Paper
                    className={styles.paper}
                    elevation={5}
                    style={{ marginTop: '50px', backgroundColor: '#F4A124' }}
                  >
                    <span>
                      {' '}
                      <Receipt
                        style={{
                          color: 'white',
                          width: '1em',
                          fontSize: '10.5em',
                        }}
                      />
                      <h1
                        style={{
                          color: 'white',
                        }}
                      >
                        Add Transaction Details
                      </h1>
                    </span>
                  </Paper>
                </Grid>
              </Button>
            </div>
            <div style={{ padding: '30px' }}>
              <Button onClick={() => navigate('Transactions')}>
                <Grid key={2} item>
                  <Paper
                    className={styles.paper}
                    elevation={5}
                    style={{ marginTop: '50px', backgroundColor: '#F4A124' }}
                  >
                    <span>
                      {' '}
                      <History
                        style={{
                          color: 'white',
                          width: '1em',
                          fontSize: '10.5em',
                        }}
                      />
                      <h1
                        style={{
                          color: 'white',
                        }}
                      >
                        Transaction History
                      </h1>
                    </span>
                  </Paper>
                </Grid>
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}

export default Home;
