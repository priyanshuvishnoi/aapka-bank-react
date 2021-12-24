import { makeStyles, createStyles, DefaultTheme } from '@material-ui/styles';

const useStyles = makeStyles((theme: DefaultTheme) =>
  createStyles({
    main: {
      placeItems: 'center',
      minHeight: '100vh',
      display: 'grid',
      backgroundImage:
        'linear-gradient(144deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
      fontSize: '2rem',
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem',
      background: '#ffffff66',
      alignItems: 'center',
      backgroundClip: 'text',
      maxWidth: '465px',

      '&>*': {
        margin: '1rem 0',
      },
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
      border: '1px solid black',
    },

    formInput: {
      width: '40rem',
      margin: '1.5rem 0',
      '&>*': {
        fontSize: '2rem',
        fontWeight: 'bold',
      },

      '&>p': {
        fontSize: '1.5rem',
      },
    },

    button: {
      background:
        'linear-gradient(144deg, rgba(252,70,107,1) 0%,rgba(63,94,251,1)  100%)',
      color: '#fff',
      fontSize: '2rem',
      margin: '2rem 0 0 0',
      height: '47px',
    },
    redirectButton: {
      fontSize: '1.8rem',
      textDecoration: 'underline',
    },
  })
);

export default useStyles;
