import NavBar from '../Components/NavBar';
import React, { useState, useEffect, useContext } from 'react';
import '../styles/requests/local.css';
import TabContainer from '../Components/Requests/TabContainer';
import RequestCard from '../Components/Requests/RequestCard';
import MobileRequestCard from '../Components/Requests/MobileRequestCard';
import MobileIssueCard from '../Components/Requests/MobileIssueCard';
import IssueCard from '../Components/Requests/IssueCard';
import { Box, Button, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ThreeDPrinterIcon from '../assets/3D_printer.svg';
import LaserCutterIcon from '../assets/laser_cutter.svg';
import CNCMillIcon from '../assets/laser_cutter.svg';
import MakerbotReplicatorImg from '../assets/mb_replicator.jpeg';
import { useNavigate } from 'react-router-dom';

import { User, Booking, Request, Issue } from '../models.ts';

import { AuthContext } from '../contexts/AuthContext';

import Axios from 'axios';
import axios from '../axios';

const Requests = () => {
    const { user } = useContext(AuthContext)!;

    const isMobile = useMediaQuery('(max-width:768px)');

    const [status, setStatus] = useState(0);
    const [userState, setUserState] = useState(user?.userRole);
    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        navigate('/'); // Navigate to the home page
      }
    }, [user, navigate]);

    // fetch
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [issues, setIssues] = useState<Issue[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userState === 'admin') {
                    const bookingsResponse = await axios.get(
                        '/bookings?status=pending'
                    );
                    setBookings(bookingsResponse.data.bookings);
                    console.log(bookingsResponse);
                    const issuesResponse = await axios.get('/issues');
                    setIssues(issuesResponse.data.issues);
                    console.log(issues);
                } else {
                    const bookingsResponse = await axios.get('/bookings');
                    setBookings(bookingsResponse.data.bookings);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const ChangeUserButton = () => (
        <Button
            id="debugButton"
            sx={{ width: '250px', position: 'sticky', bottom: 2, zIndex: 1000 }}
            variant="contained"
        >
            User Type: {userState}
        </Button>
    );

    const numberToStringMap: { [key: number]: string } = {
        0: 'approved',
        1: 'pending',
        2: 'rejected',
    };

    const theme = createTheme({
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
            fontFamily: 'Roboto, sans-serif',
        },
    });

    return (
        <div className="requestContainer">
            <ThemeProvider theme={theme}>
                <NavBar id="request" />
                <Box
                    sx={{
                        paddingTop: 3,
                        paddingLeft: 3,
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <ChangeUserButton />
                </Box>
                <TabContainer
                    value={status}
                    onChange={setStatus}
                    user={userState}
                >
                    {userState === 'admin'
                        ? status === 0
                            ? // Admin view: Show pending requests
                              bookings
                                  .filter(
                                      (bookings) =>
                                          bookings.status === 'pending'
                                  )
                                  .map((bookings) =>
                                      isMobile ? (
                                          <MobileRequestCard
                                              status={bookings.status}
                                              title={bookings.title}
                                              description={bookings.description}
                                              date={bookings.bookingDate}
                                              icon={bookings.equipment?.icon}
                                              user={userState}
                                          />
                                      ) : (
                                          <RequestCard
                                              status={bookings.status}
                                              title={bookings.title}
                                              description={bookings.description}
                                              date={bookings.bookingDate}
                                              icon={bookings.equipment?.icon}
                                              user={userState}
                                          />
                                      )
                                  )
                            : status === 1
                              ? // Admin view: Show issues when status is 1
                                issues
                                    .filter(
                                        (issues) => issues.isResolved == false
                                    )
                                    .map((issues) =>
                                        isMobile ? (
                                            <MobileIssueCard
                                                isResolved={issues.isResolved}
                                                title={issues.equipment?.name}
                                                description={issues.description}
                                                date={issues.createdAt}
                                                icon={issues.equipment?.icon}
                                                status={status}
                                            />
                                        ) : (
                                            <IssueCard
                                                isResolved={issues.isResolved}
                                                title={issues.equipment?.name}
                                                description={issues.description}
                                                date={issues.createdAt}
                                                icon={issues.equipment?.icon}
                                                status={status}
                                            />
                                        )
                                    )
                              : // Admin view: Default case
                                issues
                                    .filter(
                                        (issues) => issues.isResolved == true
                                    )
                                    .map((issues) =>
                                        isMobile ? (
                                            <MobileIssueCard
                                                isResolved={issues.isResolved}
                                                title={issues.equipment?.name}
                                                description={issues.description}
                                                date={issues.createdAt}
                                                icon={issues.equipment?.icon}
                                                status={status}
                                            />
                                        ) : (
                                            <IssueCard
                                                isResolved={issues.isResolved}
                                                title={issues.equipment?.name}
                                                description={issues.description}
                                                date={issues.createdAt}
                                                icon={issues.equipment?.icon}
                                                status={status}
                                            />
                                        )
                                    )
                        : // General user view: Filter requests based on status
                          bookings
                              .filter(
                                  (bookings) =>
                                      bookings.status ===
                                      numberToStringMap[status]
                              )
                              .map((bookings) =>
                                  isMobile ? (
                                      <MobileRequestCard
                                          status={bookings.status}
                                          title={bookings.title}
                                          description={bookings.description}
                                          date={bookings.bookingDate}
                                          icon={bookings.equipment?.icon}
                                          user={userState}
                                      />
                                  ) : (
                                      <RequestCard
                                          status={bookings.status}
                                          title={bookings.title}
                                          description={bookings.description}
                                          date={bookings.bookingDate}
                                          icon={bookings.equipment?.icon}
                                          user={userState}
                                      />
                                  )
                              )}
                </TabContainer>
            </ThemeProvider>
        </div>
    );
};

export default Requests;
