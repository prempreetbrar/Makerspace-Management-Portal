import React, { useState, useEffect, useContext, useRef} from "react";
import { Fab, Tab, Tabs, Stack, Typography, Button, Card, CardContent, CardActionArea, CardActions, Accordion, ButtonGroup, CircularProgress, Grid2, IconButton, TextField, FormGroup, Tooltip, Modal } from '@mui/material';
import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { CancelRounded, ConstructionOutlined, TheaterComedyOutlined } from "@mui/icons-material";
import WindowDimensions from "../WindowDimensions";
import { AuthContext, UserRoles } from "../../contexts/AuthContext";
import { daDK } from "@mui/x-date-pickers/locales";
import { get } from "http";
import axiosInstance from "../../axios";
import ModalBase from "./ModalBase";
import customParseFormat from "dayjs/plugin/customParseFormat"

dayjs.extend(customParseFormat);
const BASIC_MIN_TIME = '11:00:00';
const BASIC_MAX_TIME = '14:00:00';

const allTimeSlots = [
    '08:00:00',
    '09:00:00',
    '10:00:00',
    '11:00:00',
    '12:00:00',
    '13:00:00',
    '14:00:00',
    '15:00:00',
    '16:00:00',
    '17:00:00',
    '18:00:00',
    '19:00:00',
];

type TimeSlot =
{
    displayTime: string,
    time: string,
    isAvailable: boolean,
}

type BookingData = 
{
    [key: string]: string[]
}


const theme = createTheme();
type TimeEntry = {
    displayTime: string,
    premiumOnly: boolean,
}

type DateEntry = 
{
    date: string,
    times: string[],
}
interface Booking
{
    id: number, 
    date: string,
    timeSlot1: string,
    timeSlot2: string,
}

interface BookingModalProps 
{
    open: boolean,
    onClose: ()=> void,
    onSubmit: ()=>void,
    equipmentID: number,
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



type TimeSlots = 
{
    [key: string]:
    {
        displayTime: string,
        isAvailable: boolean,
    }
}
function createSlots()
{
    let slots:TimeSlots = {};
    for(let i = 8; i <= 19; ++i)
    {
        if(i < 10)
        {
            slots[`0${i}:00:00`] = {displayTime: '8:00 AM', isAvailable: false};
        }
        else
        {
            slots[`${i}:00:00`] = {displayTime: '8:00 AM', isAvailable: false};
        }
    }
    return slots;
}
const timeButtonStyle = { width: 100, margin: '2px', fontSize: 11 };

// Need to link clicking off the modal to the close event. For now, linked to the close button only.
const BookingModal = ({open, onClose, onSubmit, equipmentID}:BookingModalProps) => {
    //@ts-ignore
    const firstTimeSlot = React.useRef("");
    const secondTimeSlot = React.useRef("");
    const baseOpenings= React.useRef<BookingData>({}); // this never changes.
    const [openings, setOpenings] = useState<BookingData>({});
    const {user} = useContext(AuthContext)!;
    const {height, width} = WindowDimensions();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>();
    // all event listeners would need to be exposed at some point via Props. 
    //@ts-ignore
    const defaultDate = dayjs();
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDate, setSelectedDate] = useState(dayjs()); // the default selected date. 
    const [slots, setSlots] = useState<TimeSlots>(createSlots());
    const [maxDate, setMaxDate] = useState(dayjs().add(7, 'day'));
    const [firstSelectedTime, setFirstSelectedTime] = useState("");
    const [secondSelectedTime, setSecondSelectedTime] = useState(""); // NOT IMPLEMENTED
    const [selectedTimeButton, setSelectedTimeButton] = useState(-1); // must be -1 because the first value is 0.
    const [disabled, setDisabled] = useState(false);

    React.useEffect(()=>
    {
        if(user && user.userRole! === UserRoles.PREMIUM)
        {
            setMaxDate(dayjs().add(28,'day'));
        }
        else
        {
            setMaxDate(dayjs().add(14, 'day'));
        }
    }, [user]);


    const shouldDisableDate = (date: Dayjs)=>
    {
        const dateString = date.format("YYYY-MM-DD");
        const pred = !(openings[dateString] && openings[dateString].length > 0);
        return pred;
    }

    const updateTimeSlots = ()=>
    {

        const formattedDate = selectedDate.format("YYYY-MM-DD");
        const times: string[] = baseOpenings.current[formattedDate];
        // We're assuming the times array isn't undefined
        // Safeguards are in place to make sure that Array.includes is not being called on "undefined".
        const minTime = dayjs(BASIC_MIN_TIME, "HH:MM:SS");
        const maxTime = dayjs(BASIC_MAX_TIME, "HH:MM:SS"); // If time permitted, these should be on the backend.
        Object.keys(slots).forEach((key:string) => 
            {
                if(user!.userRole !== UserRoles.PREMIUM)
                {
                    const time = dayjs(key, "HH:MM:SS");
                    if(time.isBefore(maxTime) && time.isAfter(minTime))
                    {
                        slots[key].isAvailable = times ? times.includes(key) : false
                    }
                    else
                    {
                        slots[key].isAvailable = false;
                    }
                }
                else
                {
                    // if the key exists in the times array, the slot is available for premium users and basic.
                    slots[key].isAvailable = times ? times.includes(key) : false;
                }
            });
        setSlots(slots);
    }
    useEffect(() => {
        setInputText("");
        async function getBookingsForEquipment(equipmentID:number)
        {
            if(equipmentID === -1)
            {
                return; // don't bother fetching data.
            }
            setLoading(true);
            console.log("Syncing with backend...");
            try
            {
                const response = await axiosInstance.get(`/bookings/days/slots?equipmentID=${equipmentID}`);
                baseOpenings.current = response.data.availableBookingDaysSlots; // keep this in the background
                setOpenings(baseOpenings.current);
                Object.keys(openings)[0];
                updateTimeSlots();
                // NICE TO HAVE: disable days that aren't available.
                // baseOpenings maps to a lookup object
            }
            catch(error: any)
            {
                console.log("Failed to fetch bookings for Equipment");
                console.log(error.data)
            }
            finally
            {
                setLoading(false);
            }
        }
        getBookingsForEquipment(equipmentID);
    },[equipmentID]);
    
    // for the form element.
    const [inputText, setInputText] = useState("");
    const handleTextUpdate = (event:React.ChangeEvent<HTMLInputElement>) =>
    {
        setInputText(event.target.value);
    }
    //@ts-ignore

    const handleDateSelection = (newDate: Dayjs) => {
        setSelectedTime("");
        setSelectedDate(newDate);
        setSelectedTimeButton(-1);
    }
    const handleTimeSelect = (buttonIndex: number, listingTime: string) =>
    {
        // I didn't have time to implement the second time slot.
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

    const forceSync = async (equipmentID:number) =>
    {
        setLoading(true);
        console.log("Syncing with backend...");
        try
        {
            const response = await axiosInstance.get<Booking[]>(`/bookings/days/slots?equipmentID=${equipmentID}`);
            console.log(response.data);
        }
        catch(error: any)
        {
            console.log("Failed to fetch bookings for Equipment");
            console.log(error.data)
        }
        finally
        {
            setLoading(false);
        }
    }
   
    // Get bookings for equipment by day
    // Add a new booking entry
    // format ? 
    // 
    
    /* axios.post("url", {
        equipmentID: equipmentID,
        timeSlot1: "string",
    });*/

    return (
        <ThemeProvider theme={customTheme}>
            <ModalBase open={open} onClose={handleCloseModal}>
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
                            <Button variant='contained' onClick={()=>forceSync}>Force Sync</Button>
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
                            <DateCalendar value={selectedDate} shouldDisableDate={shouldDisableDate} disablePast={true} timezone="system" onChange={handleDateSelection}sx={{minWidth: 300, backgroundColor: '#ECE6F0', borderRadius: 4}} defaultValue={defaultDate} minDate={defaultDate} maxDate={maxDate} disabled={disabled}/>
                        </Box>
                        <Box display="flex" flexDirection="column"  alignContent={"center"}>
                                <Typography variant='h6' sx={{marginTop: 1}}>
                                Available Times:
                                </Typography>
                            <Box id="time-display" display={"flex"} flexDirection={"column"} alignItems={'center'}>
                                <Grid2 container rowSpacing={0.25} alignItems ="left" flexGrow={1} justifyContent={"left"}> 
                                    {

                                        /* allTimeSlots.map((listing, index)=>(
                                                <Button key={index} variant={ selectedTimeButton !== index? 'outlined' : 'contained'}  sx={timeButtonStyle} onClick={() => handleTimeSelect(index, listing.time)} 
                                                disabled={user!.userRole !== UserRoles.PREMIUM && listing.premiumOnly}>
                                                    {listing.time}
                                                </Button>
                                            ))
                                        */}
                                </Grid2>
                            </Box>
                            <Box component="form" sx={{paddingTop: 3}}>
                                <TextField id="DescriptionField" label="Request Details" placeholder="Description"sx={{fontSize: 10}} maxRows={2}  variant="filled" onChange={handleTextUpdate} multiline fullWidth required>
                                </TextField>
                            </Box>                            
                            <Button variant="contained" sx={{marginTop: 3, backgroundColor: '#65558F', color:"#FFFFFF", width:'120px'}} onClick={onSubmit} disabled={(inputText === "" || selectedTime === "")}>
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Box>
                </Box>
            </LocalizationProvider>
         </ModalBase>
        </ThemeProvider>
    )
}
export default BookingModal