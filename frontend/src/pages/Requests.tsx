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
import { Booking, Issue } from '../models.ts';
import { AuthContext } from '../contexts/AuthContext';
import Axios from 'axios';
import axios from '../axios';
import CancelReservationModal from '../Components/Requests/CancelReservationModal.tsx';
import RejectReservationModal from '../Components/Requests/RejectReservationModal.tsx';
import ApproveReservationModal from '../Components/Requests/ApproveReservationModal.tsx';

const Requests = () => {
    //media query
    const isMobile = useMediaQuery('(max-width:768px)');

    //user context
    const { user } = useContext(AuthContext)!;
    const [userState, setUserState] = useState(user?.userRole);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/'); // Navigate to the home page
        }
    }, [user, navigate]);

    //status for tab container
    const [status, setStatus] = useState(0);

    const numberToStringMap: { [key: number]: string } = {
        0: 'approved',
        1: 'pending',
        2: 'denied',
    };

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

    // for debugging
    // const ChangeUserButton = () => (
    //     <Button
    //         id="debugButton"
    //         sx={{ width: '250px', position: 'sticky', bottom: 2, zIndex: 1000 }}
    //         variant="contained"
    //     >
    //         User Type: {userState}
    //     </Button>
    // );

    // modals
    const [modalState, setModalState] = useState<{
        name: string | null;
        data?: Booking | Issue | null;
    }>({
        name: null,
        data: null,
    });

    const handleOpenModal = <T extends Booking | Issue>(
        modalName: string,
        modalData?: T | null
    ) => {
        setModalState({ name: modalName, data: modalData });
    };

    const handleCloseModal = () => {
        setModalState({ name: null, data: null });
    };

    // button functions and api requests
    const handleDeleteBooking = async (id?: number) => {
        console.log(`Deleting booking with ID: ${id}`);
        try {
            await axios.delete(`/bookings?id=${id}`);
            setBookings((prev) => prev.filter((booking) => booking.id !== id));
        } catch (error) {
            console.log('Error deleting booking:', error);
        }
        handleCloseModal();
    };

    const handleRejectBooking = async (textValue: string, idValue?: number) => {
        console.log(`Rejecting booking with ID: ${idValue}`);
        try {
            await axios.patch(`/bookings`, {
                id: idValue,
                status: 'denied',
                adminComments: textValue,
            });
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.id === idValue
                        ? {
                              ...booking,
                              status: 'denied',
                              adminComments: textValue,
                          }
                        : booking
                )
            );
        } catch (error) {
            console.log('Error deleting booking:', error);
        }

        handleCloseModal();
    };

    const handleApproveBooking = async (idValue?: number) => {
        console.log(`Approving booking with ID: ${idValue}`);
        try {
            await axios.patch(`/bookings`, {
                id: idValue,
                status: 'approved',
            });
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.id === idValue
                        ? {
                              ...booking,
                              status: 'approved',
                          }
                        : booking
                )
            );
        } catch (error) {
            console.log('Error approving booking:', error);
        }

        handleCloseModal();
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
        <ThemeProvider theme={theme}>
            <NavBar id="request" />
            <div className="requestContainer">
                <Box
                    sx={{
                        paddingTop: 3,
                        paddingLeft: 3,
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    {/* <ChangeUserButton /> */}
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
                                              key={bookings.id}
                                              booking={bookings}
                                              userRole={userState}
                                          />
                                      ) : (
                                          <RequestCard
                                              booking={bookings}
                                              handleDelete={() =>
                                                  handleOpenModal(
                                                      'cancelReservation',
                                                      bookings
                                                  )
                                              }
                                              handleReject={() =>
                                                  handleOpenModal(
                                                      'rejectReservation',
                                                      bookings
                                                  )
                                              }
                                              handleAccept={
                                                  localStorage.getItem(
                                                      'dontShowModal'
                                                  ) === 'true'
                                                      ? () =>
                                                            handleApproveBooking(
                                                                bookings?.id
                                                            )
                                                      : () =>
                                                            handleOpenModal(
                                                                'approveReservation',
                                                                bookings
                                                            )
                                              }
                                              userRole={userState}
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
                                                key={issues.id}
                                                issue={issues}
                                            />
                                        ) : (
                                            <IssueCard issue={issues} />
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
                                                key={issues.id}
                                                issue={issues}
                                            />
                                        ) : (
                                            <IssueCard issue={issues} />
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
                                          key={bookings.id}
                                          booking={bookings}
                                          userRole={userState}
                                          handleDelete={() =>
                                              handleOpenModal(
                                                  'cancelReservation',
                                                  bookings
                                              )
                                          }
                                      />
                                  ) : (
                                      <RequestCard
                                          booking={bookings}
                                          handleDelete={() =>
                                              handleOpenModal(
                                                  'cancelReservation',
                                                  bookings
                                              )
                                          }
                                          userRole={userState}
                                      />
                                  )
                              )}
                </TabContainer>

                <CancelReservationModal
                    open={modalState.name === 'cancelReservation'}
                    onClose={handleCloseModal}
                    data={modalState.data as Booking}
                    onConfirm={() => {
                        handleDeleteBooking(modalState.data?.id);
                    }}
                />

                <RejectReservationModal
                    open={modalState.name === 'rejectReservation'}
                    onClose={handleCloseModal}
                    data={modalState.data as Booking}
                    onReject={handleRejectBooking}
                />

                <ApproveReservationModal
                    open={modalState.name === 'approveReservation'}
                    onClose={handleCloseModal}
                    data={modalState.data as Booking}
                    onConfirm={() => {
                        handleApproveBooking(modalState.data?.id);
                    }}
                />
            </div>
        </ThemeProvider>
    );
};

export default Requests;
