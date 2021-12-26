import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    main: {
      minHeight: 'calc(100vh - 80px)',
    },
    heading: {
      fontSize: '6rem',
      fontWeight: 'bold',
      margin: '2rem',
    },

    tableHead: {
      backgroundColor: '#000',
      color: '#fff',

      '&>*': {
        color: '#fff',
        fontSize: '2rem',
      },
    },
    tableBody: {
      '&>*:nth-child(even)': {
        backgroundColor: '#bbb',
      },
    },
    tableRow: {
      '&>*': {
        fontSize: '2rem',
      },

      '&:hover': {
        backgroundColor: '#777',
        color: '#fff',

        '&>*': {
          color: '#fff',
        },
      },
    },
  })
);

export default useStyles;
