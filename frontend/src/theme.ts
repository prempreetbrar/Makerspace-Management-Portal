import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#65558F',
        },
        secondary: {
            main: '#D0BCFE',
        },
        text: {
            primary: '#000000',
            secondary: '#5F5F5F',
        },
        background: {
            default: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },

    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 768,
            lg: 1200,
            xl: 1536,
        },
    },
});

export default theme;
