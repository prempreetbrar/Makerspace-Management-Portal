import '../styles/requests/local.css';
import * as React from 'react';
import illustrationDesktop from '../assets/2.jpg';
import illustrationMobile from '../assets/1.png';
import NavBar from '../Components/NavBar.tsx';
import MainContainer from '../Components/MainContainer.tsx';
import { Tab, Tabs } from '@mui/material';
import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { UserProvider, useUser } from '../hooks/UserProvider.tsx';
// like, really need to simplify these...

const ResponsiveBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    width: '100%', // default width
    [theme.breakpoints.up('sm')]: {
        width: '50%',
    },
    [theme.breakpoints.up('md')]: {
        width: '33%',
    },
    [theme.breakpoints.up('lg')]: {
        width: '25%',
    },
    [theme.breakpoints.up('xl')]: {
        width: '20%',
    },
}));

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
    setUserByIndex(0); // basic user
    const [value, setValue] = React.useState('Approved'); // this is the default state I assume
    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const randomList: Array<String> = ["Apples", "Bananas", "Oranges", "Celery", "Carrots", "Avocados", "Pineapples", "Mangoes", "Potatoes", "Tomatoes", "Beans"];
    return (
        <div className='bg'>
            <MainContainer>
                {/* at some point, there should be a check for some sort of session token*/
                /* also I don't know how to do media queries, so designing mobile first */}
                <NavBar />
                <div className='page-content'>
                    <TabContext value={value}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                            <Tab label="Approved" value="Approved" />
                            <Tab label="Pending" value="Pending" />
                            <Tab label="Denied" value="Denied" />
                        </TabList>
                        <TabPanel value="Approved">
                            {/* TO DO: Make separate pages for each */}
                            <Box sx={{ width: '100%' }}>
                                <Typography variant='h2' sx={{ padding: '30px' }}>
                                    Approved Requests Tab <br />

                                    Email: {user.email}

                                </Typography>
                                <Stack spacing={3}>
                                    {
                                        randomList.map(
                                            (item, index) =>
                                                <Typography key={index} variant='body2'> {item} </Typography>
                                        )
                                    }
                                </Stack>
                            </Box>
                        </TabPanel>
                        <TabPanel value="Pending">
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%'
                            }}>
                                <Typography variant='h2' sx={{ padding: '30px' }}>
                                    Pending Requests Tab
                                </Typography>
                                <Box sx={{
                                    alignSelf: 'center',
                                    alignContent: 'center',
                                }}>
                                    <Stack spacing={3}>
                                        {
                                            randomList.map(
                                                (item, index) =>
                                                    <Box sx={{ width: '40vw', border: '1px solid', borderRadius: '30%' }}>
                                                        <Typography key={index} variant='body2'> {item} </Typography>
                                                    </Box>
                                            )
                                        }

                                    </Stack>
                                </Box>
                            </Box>
                        </TabPanel>
                        <TabPanel value="Denied">
                            <Box sx={{ width: '100%' }}>
                                <Typography variant='h2' sx={{ padding: '30px' }}>
                                    Denied Requests Tab
                                </Typography>
                                <Stack spacing={3}>
                                    {
                                        randomList.map(
                                            (item, index) =>
                                                <Typography key={index} variant='body2'> {item} </Typography>
                                        )
                                    }
                                </Stack>
                            </Box>
                        </TabPanel>
                    </TabContext>
                </div>
            </MainContainer >
        </div >
    )
}

export default Requests;

