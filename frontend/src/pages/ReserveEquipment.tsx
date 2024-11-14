import '../styles/requests/local.css';
import React, { useState, useEffect } from 'react';
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
import BookingCalendar from './CalendarPage.tsx';
// like, really need to simplify these...

type Equipment = {
    id: number,
    name: string,
    description: string,
    isUnderMaintenance: boolean,
    isBookable: boolean,
    isPremium: boolean,
}

type Booking = {
    id: number;
    userEmail: string;
    equipmentID: number;
    bookingDateTime: Date;
    bookingDuration: number;
};
const equipmentModel: Equipment[] = [
    { id: 1, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 2, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 3, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 4, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 5, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 6, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 7, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 8, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 9, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 10, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 11, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 12, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 13, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 14, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 15, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 16, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 17, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 18, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 19, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 20, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 21, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 22, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 23, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 24, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 25, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 26, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 27, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 28, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 29, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
    { id: 30, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
];

const theme = createTheme();
const ReserveEquipment = () => {

    const handleChangeUser = () => {
        const nextIndex = currentUserIndex + 1 % 3;
        setCurrentUserIndex(nextIndex);
        setUserByIndex(nextIndex);
        setCurrentUserRole(user.userRole);
    }

    const { user, setUserByIndex } = useUser();
    const [currentUserIndex, setCurrentUserIndex] = React.useState(0);
    const [currentUserRole, setCurrentUserRole] = React.useState(user.userRole);

    return (
        <MainContainer>
            <ThemeProvider theme={theme}>
                <NavBar />
                <Button variant={"contained"} onClick={handleChangeUser}> Change User: {currentUserRole} </Button>
                <div className='page-content'>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                    }}>
                        <BookingCalendar>

                        </BookingCalendar>
                        < Stack spacing={3} sx={{ alignSelf: 'center' }}>
                            {
                                equipmentModel.map((item, index) =>
                                (
                                    <RequestCard key={index}>
                                        <Box>
                                            <Typography variant='body2' sx={{
                                                color: 'black',
                                                fontWeight: 'bold',
                                                fontSize: '20pt',
                                            }}> {item.name}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Accordion sx={{ boxShadow: 0 }}>
                                                <AccordionSummary>
                                                    <Typography variant='body2'>
                                                        View Details
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography variant='body1' sx={{ textAlign: 'left' }}>
                                                        {item.description}
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Box>
                                    </RequestCard>
                                ))
                            }
                        </Stack>
                    </Box>
                </div>
            </ThemeProvider >
            {/* at some point, there should be a check for some sort of session token*/
                /* also I don't know how to do media queries, so designing mobile first */
            }
        </MainContainer >
    )
}

export default ReserveEquipment;

/**/