import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    searchField: {
        marginBottom: theme.spacing(2),
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(2),
    },
}));

export default useStyles;

export const useFormStyles = makeStyles((theme) => ({
    form: {
        padding: theme.spacing(2),
    },
    submitButton: {
        marginTop: theme.spacing(2),
    },
}));
