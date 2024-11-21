import React from "react";
import { createTheme } from "@mui/material";

const GlobalTheme = createTheme(
    {
    palette: {
        primary: {
            main: '#65558F',
        },
        secondary: {
            main: '#ECE6F0',
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
        fontFamily: 'Arial, sans-serif',
    },
});

export default GlobalTheme
