import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976D2',
        },
        secondary: {
            main: '#616161',
        },
        info: {
            main: '#0097A7',
        },
        success: {
            main: '#388E3C',
        },
        warning: {
            main: '#FFA000',
        },
        error: {
            main: '#D32F2F',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h3: {color: grey[700]}
    },
});

export default theme;
