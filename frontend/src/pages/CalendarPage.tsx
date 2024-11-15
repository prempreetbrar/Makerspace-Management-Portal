import React, { useState, useEffect } from "react";
import '../styles/requests/local.css';

import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NavBar from '../Components/NavBar.tsx';
import MainContainer from '../Components/MainContainer.tsx';
import { Fab, Tab, Tabs, Stack, Typography, Button, Card, CardContent, CardActionArea, CardActions, Accordion, ButtonGroup, CircularProgress } from '@mui/material';
import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add'
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useUser } from '../hooks/UserProvider.tsx';
import RequestCard from '../Components/Requests/RequestCard.tsx';
import axios from 'axios';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";
const theme = createTheme();

const BookingCalendar = () => {
    const [jsSelectedDate, setJSSelectedDate] = useState()
    const [selectedDay, setSelectedDay] = useState(dayjs());
    const handleDateSelection = (newDate: React.SetStateAction<dayjs.Dayjs>) => {
        setSelectedDay(newDate);

    }
    const today = dayjs();
    const threeMonthsFromNow = today.add(3, "month");
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display={"flex"} sx={{
                alignSelf: 'center',
                justifyContent: 'space-around',
                flexDirection: {
                    xs: 'column',
                    md: 'row',
                },
                margin: '10px',
                maxWidth: 600,
            }}>
                    <DateCalendar disablePast={true} sx={{}} defaultValue={dayjs(today)} minDate={today} maxDate={threeMonthsFromNow} />
                    <Box display={"flex"} justifyContent={'center'}>
                        <TimePicker sx={{
                            marginTop: {
                                xs: '20px',
                                md: '50%',
                            }
                        }
                        } />
                    </Box>
            </Box>
        </LocalizationProvider>
    )
}
export default BookingCalendar