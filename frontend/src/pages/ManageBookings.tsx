/// THIS FILE IS DEPRECATED. 

import '../styles/requests/local.css';
import * as React from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NavBar from '../Components/NavBar';
import MainContainer from '../Components/MainContainer.tsx';
import { Fab, Tab, Tabs, Stack, Typography, Button, Card, CardContent, CardActionArea, CardActions, Accordion, ButtonGroup } from '@mui/material';
import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add'
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { UserProvider, useUser } from '../hooks/UserProvider.tsx';
import { request } from 'http';
import { describe } from 'node:test';
import RequestCard from '../Components/Requests/RequestCard.tsx';

type Booking = 
{
    time: string,
    equipment: string,
    user: string,
}

const requestTemplate1 =
{
    userEmail: "real_email1@email.com",
    title: "Request Title",
    description: "This is the request description. It might be very long or short.",
    status: "approved"
}
const requestTemplate2 =
{
    userEmail: "real_email1@email.com",
    title: "Request Title2",
    description: "This is the request description. It might be very long or short.",
    status: "pending",
}
const requestTemplate3 =
{
    userEmail: "real_email1@email.com",
    title: "Request Title3",
    description: "This is the request description. It might be very long or short.",
    status: "denied",
}

const templateRequests = [requestTemplate1, requestTemplate1, requestTemplate2, requestTemplate2, requestTemplate3, requestTemplate3];

const theme = createTheme();
const ManageBookings = () => {


    const { user, setUser} = useUser();
    const [currentUserIndex, setCurrentUserIndex] = React.useState(0);
    const [currentUserRole, setCurrentUserRole] = React.useState(user.userRole);
    const handleChangeUser = () => {
        setUser();
    }

    const [value, setValue] = React.useState('Approved'); // this is the default state I assume
    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <>
        <NavBar id='manageBookings' />
        <MainContainer>
            <ThemeProvider theme={theme}>
            <Button id="debugButton" fullWidth={false} sx={{position: 'sticky', bottom: 2, zIndex: 1000}} variant={"contained"} onClick={handleChangeUser}> Change User: {currentUserRole} </Button>
            <Box id="contentBox" sx={{position: 'fixed', display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflowX:"hidden", overflowY: "scroll", padding: 0}}>
                    <TabContext value={value}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                            <Tab label="Approved" value="Approved" />
                            <Tab label="Pending" value="Pending" />
                            <Tab label="Denied" value="Denied" />
                        </TabList>
                        <TabPanel value="Approved">
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                            }}>
                                <Stack spacing={3} sx={{ alignSelf: 'center' }}>
                                    {
                                        templateRequests.filter(item => item.status === "approved").map((_item, _index) =>
                                            <RequestCard status={''} title={''} description={''} date={''} file={''} icon={undefined} user={''}/>
                                        )
                                    }
                                </Stack>
                            </Box>
                        </TabPanel>
                        <TabPanel value="Pending">
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                            }}>
                                <Stack spacing={3} sx={{ alignSelf: 'center' }}>
                                    {
                                        templateRequests.filter(item => item.status === "pending").map((_item, _index) =>
                                            <RequestCard user={user.userRole}/>
                                        )
                                    }
                                </Stack>
                            </Box>
                        </TabPanel>
                        <TabPanel value="Denied">
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                            }}>
                                <Stack spacing={3} sx={{ alignSelf: 'center' }}>
                                    {
                                        templateRequests.filter(item => item.status === "denied").map((_item, index) =>
                                            <RequestCard key={index} user={user.userRole} />
                                        )
                                    }
                                </Stack>
                            </Box>
                        </TabPanel>
                    </TabContext>
                    </Box>
            </ThemeProvider >
        </MainContainer >
        </>
    )
}

export default ManageBookings;

