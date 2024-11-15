import '../styles/reserve_equipment/local.css';
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
import PopupMenu from '../Components/PopupMenu.tsx';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
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
  { id: 15, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: true },
  { id: 16, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: true },
  { id: 17, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: true },
  { id: 18, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: true },
  { id: 19, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: true },
  { id: 20, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: true },
  { id: 21, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: true },
  { id: 22, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: true },
  { id: 23, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: true },
  { id: 24, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: true },
  { id: 25, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: true },
  { id: 26, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: true },
  { id: 27, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: true },
  { id: 28, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
  { id: 29, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
  { id: 30, name: "3D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: false },
];

const theme = createTheme();
interface EquipmentCardProps {
  children?: React.ReactNode,
  userRole?: string,
}
interface BookingModalProps {
  userRole?: string
}


const BookingModal = ({ userRole }: BookingModalProps) => {

}



const EquipmentCard = ({ children, userRole }: EquipmentCardProps) => {
  <Card
    sx={{
      border: '1px solid black',
      backgroundColor: theme.palette.secondary.main,
      width: '80vw',
      minHeight:
      {
        xs: '100px',
      },
      display: 'flex',
      borderRadius: '20px',
      flexDirection: 'column'
    }}>
    <CardActionArea>
      <CardContent sx={{ padding: '3px' }}>
        {children}
      </CardContent>
    </CardActionArea>
  </Card >
}
const ModalStyle =
{
  position: 'absolute',
  display: 'flex',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:
  {
    xs: 400,
    md: 900,
  },
  height:
  {
    xs: '80vh',
    md: 500,
  },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
const ReserveEquipment = () => {

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
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
      <div className="reserve-test-page">
        <button type='button' className="open-menu-button" onClick={togglePopup}>
          Open Menu
        </button>
        {isOpen &&
          <PopupMenu onClose={togglePopup}>
            <div className="calendar-container">
              <p>Calendar Placeholder</p>
            </div>
            <div className="time-slots">
              <p>Time Slots Placeholder</p>
              <p>Time Slots Placeholder</p>
            </div>
            <div className="reservation-form">
              <h2>Reserve Equipment</h2>
              <TextField label="Equipment Type" value="3D Printer" InputProps={{ readOnly: true }} />
              <TextField label="Date of Reservation" placeholder="00/00/0000" />
              <TextField label="First Name" placeholder="First Name" />
              <TextField label="Last Name" placeholder="Last Name" />
              <TextField label="Student Number" placeholder="12345678" />
              <label>Request Details</label>
              <textarea placeholder="Description"></textarea>
              <div className="buttons">
                <Button variant="contained" className="report-issue">Report Issue</Button>
                <Button variant="contained" className="submit-request">Submit Request</Button>
              </div>
            </div>
          </PopupMenu>}
      </div>

      <ThemeProvider theme={theme}>
        <NavBar />
        <Button variant={"contained"} onClick={handleChangeUser}> Change User: {currentUserRole} </Button>
        <div className='page-content'>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}>


            <Modal open={open} onClose={handleClose}>
              <Box sx={ModalStyle}>
                {currentUserRole === 'Admin' ?
                  (
                    <Typography variant='body1'>
                      Admins see this
                    </Typography>
                  ) : (
                    <Typography variant='body2'>
                      <BookingCalendar>
                      </BookingCalendar>
                    </Typography>
                  )}
              </Box>
            </Modal>
            < Stack spacing={3} sx={{ alignSelf: 'center' }}>
              {
                equipmentModel.map((item, index) =>
                (

                  <Card
                    sx={{
                      border: '1px solid black',
                      backgroundColor: theme.palette.secondary.main,
                      width: '80vw',
                      minHeight:
                      {
                        xs: '100px',
                      },
                      display: 'flex',
                      borderRadius: '20px',
                      flexDirection: 'column'
                    }}>
                    <CardActionArea onClick={handleOpen}>
                      <CardContent sx={{ padding: '3px' }}>
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
                                {/*
                                                            *  I need to link the modal to each component via the card action
                                                            *  Admins also need a different view for approval
                                                            *  This means the schema needs to be updated
                                                            * */}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography variant='body1' sx={{ textAlign: 'left' }}>
                                {item.description}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card >
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

/*
    
    */