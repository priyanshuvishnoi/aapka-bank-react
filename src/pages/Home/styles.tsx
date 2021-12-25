import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 360,
    width: 290,
  },
  control: {
    padding: '2rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  heading: {
    fontFamily: 'Calibri',
    fontSize: 40,
    padding: '90px',
  },
  slogan: {
    fontFamily: 'Calibri',
    fontSize: 20,
    color: 'teal',
    fontStyle: 'italic',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    placeItems: 'center',
    width: '80vw',
  },
}));

export default useStyles;
