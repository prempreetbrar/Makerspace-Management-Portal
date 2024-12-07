import { GlobalStyles } from '@mui/material';

const globalStyles = (
    <GlobalStyles
        styles={{
            '::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
            },
            '::-webkit-scrollbar-thumb': {
                backgroundColor: '#49454F',
                borderRadius: '4px',
            },
            '::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#1D1B20',
            },
            '::-webkit-scrollbar-track': {
                backgroundColor: '#79747E',
                borderRadius: '4px',
            },
        }}
    />
);

export default globalStyles;
