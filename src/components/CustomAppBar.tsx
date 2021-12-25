import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AccountCircle, ExitToApp, Menu as MenuIcon } from '@material-ui/icons';
import { DefaultTheme, makeStyles, createStyles } from '@material-ui/styles';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../App';

function CustomAppBar() {
  const { deleteCookie } = useContext(TokenContext);
  const styles = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar variant="elevation" position="fixed">
      <Toolbar className={styles.toolbar}>
        <Typography
          variant="h3"
          onClick={e => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          Aapka Bank
        </Typography>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon style={{ fontSize: '3rem' }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={e => navigate('/profile')}
              className={styles.menuItem}
            >
              <AccountCircle fontSize="large" />
              &nbsp; Profile
            </MenuItem>
            <MenuItem onClick={deleteCookie} className={styles.menuItem}>
              <ExitToApp fontSize="large" />
              &nbsp; Log Out
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default CustomAppBar;

const useStyles = makeStyles((theme: DefaultTheme) =>
  createStyles({
    toolbar: {
      justifyContent: 'space-between',
    },
    menuItem: {
      fontSize: '1.5rem',
    },
  })
);
