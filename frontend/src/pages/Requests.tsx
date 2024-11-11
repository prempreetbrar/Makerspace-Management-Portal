import '../styles/requests/local.css';
import * as React from 'react';
import illustrationDesktop from '../assets/2.jpg';
import illustrationMobile from '../assets/1.png';
import NavBar from '../Components/NavBar.tsx';
import MainContainer from '../Components/MainContainer.tsx';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';


const Requests = () => {


    const [value, setValue] = React.useState('Approved');
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
                <div className='content'>
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
                                    Approved Requests Tab
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
                            <Box sx={{ width: '100%' }}>
                                <Typography variant='h2' sx={{ padding: '30px' }}>
                                    Pending Requests Tab
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

