import '../styles/requests/local.css';
import * as React from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NavBar from '../Components/NavBar.tsx';
import MainContainer from '../Components/MainContainer.tsx';
import { Fab, Tab, Tabs, Stack, Typography, Button, Card, CardContent, CardActionArea, CardActions, Accordion, ButtonGroup } from '@mui/material';
import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add'
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { UserProvider, useUser } from '../hooks/UserProvider.tsx';
import { RequestsProvider } from '../hooks/RequestsProvider.tsx';
import { request } from 'http';
import { describe } from 'node:test';
import RequestCard from '../Components/Requests/RequestCard.tsx';
// like, really need to simplify these...


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
const Requests = () => {

    {/* TO DO: 
        * Fetch requests from the server
        * Prerequisite: Need some sort of state to be implemented
        * Possible workaround: Hardcode in the requests for a random user
    << BIGGEST CHALLENGES  >>
        * Admin vs Normal User view
        * Getting a state
    */}
    const { user, setUserByIndex } = useUser();
    const [currentUserIndex, setCurrentUserIndex] = React.useState(0);
    const [currentUserRole, setCurrentUserRole] = React.useState(user.userRole);
    const handleChangeUser = () => {
        const nextIndex = currentUserIndex + 1 % 3;
        setCurrentUserIndex(nextIndex);
        setUserByIndex(nextIndex);
        setCurrentUserRole(user.userRole);
    }

    const [value, setValue] = React.useState('Approved'); // this is the default state I assume
    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const randomList: Array<String> = ["Apples", "Bananas", "Oranges", "Celery", "Carrots", "Avocados", "Pineapples", "Mangoes", "Potatoes", "Tomatoes", "Beans"];
    return (
        <MainContainer>
            <NavBar />
            <Button onClick={handleChangeUser}> Change User </Button>
            <ThemeProvider theme={theme}>
                <div className='page-content'>
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
                                        templateRequests.filter(item => item.status === "approved").map((item, index) =>
                                            <RequestCard>
                                                <Box>
                                                    <Typography key={index} variant='body2' sx={{
                                                        color: 'black',
                                                        fontWeight: 'bold',
                                                        fontSize: '20pt',
                                                    }}> {item.title}
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
                                        templateRequests.filter(item => item.status === "pending").map((item, index) =>
                                            <RequestCard userRole={user.userRole}>
                                                <Box>
                                                    <Typography key={index} variant='body2' sx={{
                                                        color: 'black',
                                                        fontWeight: 'bold',
                                                        fontSize: '20pt',
                                                    }}> {item.title}
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
                                        templateRequests.filter(item => item.status === "denied").map((item, index) =>
                                            <RequestCard>
                                                <Box>
                                                    <Typography key={index} variant='body2' sx={{
                                                        color: 'black',
                                                        fontWeight: 'bold',
                                                        fontSize: '20pt',
                                                    }}> {item.title}
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
                                        )
                                    }
                                </Stack>
                            </Box>
                        </TabPanel>
                    </TabContext>
                    <Fab>
                        <AddIcon />
                    </Fab>
                </div>
            </ThemeProvider >
            {/* at some point, there should be a check for some sort of session token*/
                /* also I don't know how to do media queries, so designing mobile first */}
        </MainContainer >
    )
}

export default Requests;

