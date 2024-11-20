import React, { useState, useEffect } from "react";


import { Fab, Tab, Tabs, Stack, Typography, Button, Card, CardContent, CardActionArea, CardActions, Accordion, ButtonGroup, CircularProgress, Grid2, IconButton, TextField, FormGroup, Tooltip } from '@mui/material';
import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import axios from 'axios';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { CancelRounded, TheaterComedyOutlined } from "@mui/icons-material";
import WindowDimensions from "./WindowDimensions";
const theme = createTheme();
type TimeEntry = {
    time: string,
    premiumOnly: boolean,
}
type DateEntry = 
{
    date: string,
    times: string[],
}

const timesArray: TimeEntry[] = [
    { time: "8:00 AM", premiumOnly: true},
    { time: "9:00 AM", premiumOnly: true },
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
    externalProps?: any,
}
const customTheme = createTheme({
    palette: {
        primary: {
            main: "#65558F", 
        },
        secondary: {
            main: "#ECE6F0", 
        },
        text: {
            primary: "#000000",
            secondary: "#5F5F5F", 
        },
        background: {
            default: "#FFFFFF", 
        },
    },
    typography: {
        fontFamily: "Arial, sans-serif", 
    },
});
const timeButtonStyle = { width: 100, margin: '2px', fontSize: 11 };
// Need to link clicking off the modal to the close event. For now, linked to the close button only.
const BookingCalendar = ({userRole, onClose, externalProps}:BookingCalendarProps) => {
    //@ts-ignore
    const passedInProps = externalProps;

    const {height, width} = WindowDimensions();
    // all event listeners would need to be exposed at some point via Props. 
    
    //@ts-ignore
    const [jsSelectedDate, setJSSelectedDate] = useState() // this would eventually convert dayJS into a string format
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDay, setSelectedDay] = useState(dayjs());
    //@ts-ignore
    const handleDateSelection = (newDate: React.SetStateAction<dayjs.Dayjs>) => {
        setSelectedDay(newDate);
    }
    const [inputText, setInputText] = useState("");
    const handleTextUpdate = (event:React.ChangeEvent<HTMLInputElement>) =>
    {
        setInputText(event.target.value);
    }
    const [selectedTimeButton, setSelectedTimeButton] = useState(-1); // must be -1 because the first value is 0.

    const handleTimeSelect = (buttonIndex: number, listingTime: string) =>
    {
        setSelectedTimeButton(buttonIndex);
        setSelectedTime(listingTime);
    }
    const handleCloseModal = (submitted=false) =>
    {
        if(submitted)
        {
            // save submitted data.
        }
        setInputText("");
        setSelectedTime("");
        onClose();
    }

    const today = dayjs();
    const nMonthsFromNow = today.add(2, "month");
    return (
        <ThemeProvider theme={customTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box
                        sx={{
                            height: 
                            {
                                xs: height,
                            },
                            overflowY: 'scroll',
                            borderRadius: 5, 
                            padding: 2,
                            backgroundColor: "white",
                            boxShadow: 3,
                        }}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent='center'>
                    <IconButton sx={{marginLeft: 'auto', color: theme.palette.error.main}} size="small" onClick={onClose}> { /* confirmation dialog would be nice */}
                                    <CancelRounded fontSize="large">Cancel</CancelRounded>
                    </IconButton>
                    <Box sx={{overflowX: 'hidden', overflowY: 'scroll'}} display="flex" flexDirection={"column"} alignContent={'center'}>
                        <Box display="flex" flexDirection="row" justifyContent={'space-between'} position={"sticky"} top={0} bgcolor={"white"}> 
                                <Typography variant='h4'>
                                    Reserve a time
                                </Typography>
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
                            <Box id="calendarBox" display="flex" flexDirection="column" columnGap={5} mr={{xs: 0, md: 5}}>
                                <DateCalendar disablePast={true} sx={{minWidth: 300, backgroundColor: '#ECE6F0', borderRadius: 4}} defaultValue={dayjs(today)} minDate={today} maxDate={nMonthsFromNow} />
                            </Box>
                            <Box display="flex" flexDirection="column"  alignContent={"center"}>
                                    <Typography variant='h6' sx={{marginTop: 1}}>
                                    Available Times:
                                    </Typography>
                                <Box id="time-display" display={"flex"} flexDirection={"column"} alignItems={'center'}>
                                    <Grid2 container rowSpacing={0.25} alignItems ="left" flexGrow={1} justifyContent={"left"}> 
                                        {
                                            timesArray.map((listing, index)=>(
                                                    <Button key={index} variant={ selectedTimeButton !== index? 'outlined' : 'contained'}  sx={timeButtonStyle} onClick={() => handleTimeSelect(index, listing.time)} 
                                                    disabled={userRole !== "Premium" && listing.premiumOnly}>
                                                        {listing.time}
                                                    </Button>
                                                ))
                                            }
                                    </Grid2>
                                </Box>
                                <Box component="form" sx={{paddingTop: 3}}>
                                    <TextField id="DescriptionField" label="Request Details" placeholder="Description"sx={{fontSize: 10}} maxRows={2}  variant="filled" onChange={handleTextUpdate} multiline fullWidth required>
                                    </TextField>
                                </Box>                            
                                <Button variant="contained" sx={{marginTop: 3, backgroundColor: '#65558F', color:"#FFFFFF", width:'120px'}} onClick={()=>handleCloseModal(true)} disabled={(inputText === "" || selectedTime === "")}>
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </LocalizationProvider>
        </ThemeProvider>
    )
}
export default BookingCalendar