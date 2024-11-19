import React, { useState, useEffect } from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ErrorIcon from '@mui/icons-material/Error'
import NavBar from '../Components/NavBar.tsx';
import MainContainer from '../Components/MainContainer.tsx';
import { Fab, Tab, Tabs, Stack, Typography, Button, Card, CardContent, CardActionArea, CardActions, Accordion, ButtonGroup, CircularProgress, IconButton, TextField, Input } from '@mui/material';
import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add'
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useUser } from '../hooks/UserProvider.tsx';
import RequestCard from '../Components/Requests/RequestCard.tsx';
import axios from 'axios';
import BookingCalendar from '../Components/BookingModal.tsx';
import Modal from '@mui/material/Modal';
import '../styles/reserve_equipment/local.css';
import zIndex from '@mui/material/styles/zIndex';
import WindowDimensions from '../Components/WindowDimensions.tsx';
import DisguisedButton from '../Components/DisguisedSwitch.tsx';
// like, really need to simplify these...


type Equipment = {
  id: number,
  name: string,
  description: string,
  isUnderMaintenance: boolean,
  isBookable: boolean,
  isPremium: boolean,
  setUnderMaintenece?: (value: boolean)=>void
}

type Booking = {
  id: number;
  userEmail: string;
  equipmentID: number;
  bookingDateTime: Date;
  bookingDuration: number
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
  { id: 22, name: "4D Printer", description: "prints stuff... in 3D!", isUnderMaintenance: false, isBookable: true, isPremium: true },
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
const ModalStyle = 
{
    overflow: 'hidden',
    position: 'absolute',
    display: 'flex',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 
    {
        xs: "100%",
        md: 900,
    },
    height:
    {
        xs: '100%',
        s: '80%',
        md: 500,
    },
    bgcolor: 'background.paper',
    border: '2px solid #fffff',
    
    boxShadow: 24,
    p: 
    {
        xs: 1,
        s: 2,
        md: 4
    }
}

const SearchBarStyle = 
{
    top: 0,
    alignSelf: 'center',
    width: 
    { 
        xs: '300px'

    },
    backgroundColor: 'white',

    '.MUIInputBase-root':
    {
        backgroundColor: 'white',
        border: 'none'
    }

}
const searchBarBoxStyle = 
{

    zIndex: 10000,
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    padding: 2,
    alignItems: 'center',
    textAlign: 'middle',
}

const ReserveEquipment = () => {
    const {height, width} = WindowDimensions();
    const [resultsFound, setResultsFound] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [maintenanceToggled, setmaintenanceToggled] = useState(false);
    const handleTogglemaintenance = (item: Equipment) =>
    {
        setmaintenanceToggled(!maintenanceToggled);
        item.isUnderMaintenance=!item.isUnderMaintenance;
    }
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
    const [displayModel, setDisplayModel] = useState(equipmentModel);
    const handleSearch = (event:React.ChangeEvent<HTMLInputElement>) =>
    {
        setSearchText(event.target.value);
        if(event.target.value === "")
        {
            setDisplayModel(equipmentModel)
        }
        else
        {
            // Some sort of query would probably go here.
            const searchExpr = (input: Equipment, searchTerm:string) =>
            {
                const normalizedName = input.name.toLowerCase();
                const normalizedSearchTerm = searchTerm.toLowerCase();
                return normalizedName.includes(normalizedSearchTerm);
            }
            setDisplayModel(displayModel.filter((elem)=>searchExpr(elem, event.target.value)));
            setResultsFound(displayModel.length > 0)
        }
    }
    const { user, setUserByIndex } = useUser();
    const [currentUserIndex, setCurrentUserIndex] = React.useState(0);
    const [currentUserRole, setCurrentUserRole] = React.useState(user.userRole);
    const ChangeUserButton = ()=>(<Button id="debugButton" fullWidth={false} sx={{ width: '250px', position: 'sticky', bottom: 2, zIndex: 1000}} variant={"contained"} onClick={handleChangeUser}> Change User: {currentUserRole} </Button>);
    return (
      <>
        <MainContainer>
            <ThemeProvider theme={theme}>  
                    <Box id="contentBox" sx={{position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', width: '100%', height: height , scroll: 'none', overflowX:"hidden", overflowY: "hidden", padding: 0}}>
                        <NavBar id='reserve'></NavBar>
                        <Box id="searchBarBox" sx={searchBarBoxStyle}>
                            <ChangeUserButton />
                            <Typography>
                                Search
                            </Typography>
                            <TextField sx={SearchBarStyle} onChange={handleSearch} >
                            </TextField>
                        </Box>
                        <Modal open={open} onClose={handleClose}>
                            <Box sx={ModalStyle} borderColor={"white"}>
                                {currentUserRole === 'Admin'?
                                (
                               <Typography variant='body1'>
                                    Admins see this
                                </Typography>
                                ):(
                                    <BookingCalendar onClose={handleClose} userRole={currentUserRole}>
                                    </BookingCalendar>
                                )}
                            </Box>
                        </Modal>
                        <Box display="flex" flexDirection="column" sx={{alignSelf: 'center', overflowY: 'scroll'}}>
                        <Stack spacing={3} sx={{alignSelf: 'center', pb: 10}}>
                            {
                                displayModel.map((item, index) =>
                                ( // this NEEDS to be optimized
                                <Card key={index}
                                    sx={{
                                        border: '1px solid black',
                                        backgroundColor: theme.palette.primary.main,
                                        width: '80vw',
                                        minHeight:
                                        {
                                            xs: '100px',
                                            md: '200px',
                                        },
                                        display: 'flex',
                                        borderRadius: '20px',
                                        flexDirection: 'column'
                                    }}>
                                    <CardContent>
                                        <Typography variant='body2' sx={{
                                            color: theme.palette.primary.contrastText,
                                            fontWeight: 'bold',
                                            fontSize: '20pt',
                                            padding: '5px'
                                        }}> {item.name}
                                        </Typography>
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
                                        <CardActions sx={{backgroundColor: 'white'}}>
                                            <span>
                                            <DisguisedButton showSwitchIfTrue={currentUserRole === 'Admin'} buttonDisabled={item.isUnderMaintenance} switchLabel='Under maintenance' buttonLabel='Book Now'
                                                switchToggled={item.isUnderMaintenance} onSwitch={()=>handleTogglemaintenance(item)} onButtonPress={handleOpen}
                                                buttonSX={{
                                                    backgroundColor: item.isUnderMaintenance ? theme.palette.error.main : theme.palette.action.active

                                                }}></DisguisedButton>
                                            </span>

                                        </CardActions>
                                    </CardContent>
                                </Card >
                                ))
                            }
                        </Stack>
                        </Box>
                    </Box>
            </ThemeProvider >
        </MainContainer >
      </>
    )
}

export default ReserveEquipment;

/*
    
    */