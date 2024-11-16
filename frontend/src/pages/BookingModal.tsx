import React, { useState, useEffect } from "react";
import '../styles/requests/local.css';

import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NavBar from '../Components/NavBar.tsx';
import MainContainer from '../Components/MainContainer.tsx';
import { Fab, Tab, Tabs, Stack, Typography, Button, Card, CardContent, CardActionArea, CardActions, Accordion, ButtonGroup, CircularProgress, Grid2, IconButton, TextField, FormGroup } from '@mui/material';
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
import { CancelRounded } from "@mui/icons-material";
const theme = createTheme();
type TimeEntry = {
    time: string,
    premiumOnly: boolean,
}

const timesArray: TimeEntry[] = [
    { time: "10:00 AM", premiumOnly: false },
    { time: "11:00 AM", premiumOnly: false },
    { time: "10:00 AM", premiumOnly: false },
    { time: "11:00 AM", premiumOnly: false },
    { time: "12:00 PM", premiumOnly: false },
    { time: "1:00 PM", premiumOnly: false },
    { time: "2:00 PM", premiumOnly: false },
    { time: "3:00 PM", premiumOnly: false },
    { time: "4:00 PM", premiumOnly: false },
    { time: "5:00 PM", premiumOnly: false },
    { time: "6:00 PM", premiumOnly: false },
    { time: "7:00 PM", premiumOnly: true },
    { time: "8:00 PM", premiumOnly: true }];

interface BookingCalendarProps 
{
    userRole: string,
    onClose: ()=> void,
}

const BookingCalendar = ({userRole, onClose}:BookingCalendarProps) => {
   
    const [jsSelectedDate, setJSSelectedDate] = useState()
    const [selectedDay, setSelectedDay] = useState(dayjs());
    const handleDateSelection = (newDate: React.SetStateAction<dayjs.Dayjs>) => {
        setSelectedDay(newDate);
    }
    const [inputText, setInputText] = useState("");
    const handleTextUpdate = (event:React.ChangeEvent<HTMLInputElement>) =>
    {
        setInputText(event.target.value);
    }
    
    const today = dayjs();
    const threeMonthsFromNow = today.add(3, "month");
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex" flexDirection={"column"} alignContent={'center'} overflow="hidden">
                <Box display="flex" flexDirection="row" justifyContent={'space-between'}>
                    <Typography variant={"h3"}>
                        Book a Time
                    </Typography>   
                    <IconButton sx={{width: 60}} size="large" onClick={onClose}>
                        <CancelRounded fontSize="large"/>
                    </IconButton>
                </Box>
                <Box display={"flex"} sx={{
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    flexDirection: {
                        xs: 'column',
                        md: 'row',
                    },
                    margin: '10px',
                }}>
                        <Box>
                            <DateCalendar disablePast={true} sx={{minWidth: 300}} defaultValue={dayjs(today)} minDate={today} maxDate={threeMonthsFromNow} />
                        </Box>
                        <Box display="flex" flexDirection="column" sx={{overflowY: 'scroll'}}>
                                <Typography variant='h6'>
                                    Available Times
                                </Typography>
                            <Box display={"flex"} justifyContent={'center'}>
                                <Grid2 rowSpacing={8} justifyContent={"space-between"}>
                                    {
                                    timesArray.map((listing, index)=>(
                                        listing.premiumOnly ? 
                                        ( 
                                            userRole == "Premium" ?
                                            (
                                                <Button variant={'contained'} sx={{width: 95, margin: '2px', fontSize: 11}} key={index}>
                                                    {listing.time}
                                                </Button>
                                            ):(
                                                <></>
                                            )
                                        ):(
                                            <Button variant={'contained'} sx={{width: 95, margin: '2px', fontSize: 11}} key={index}>
                                                    {listing.time}
                                                </Button>
                                        ))
                                    )}
                                </Grid2>
                            </Box>
                            <Box component="form" sx={{paddingTop: 1}}>    
                                <Typography>
                                    Reason for booking
                                </Typography>
                                <TextField id="DescriptionField" multiline sx={{fontSize: 12}} fullWidth variant="filled" onChange={handleTextUpdate}>
                                        Share your ideas
                                </TextField>
                            </Box>
                            <Button sx={{marginTop: 4}} onClick={onClose}>
                                Submit
                            </Button>
                        </Box>
                </Box>
            </Box>
        </LocalizationProvider>
    )
}
export default BookingCalendar