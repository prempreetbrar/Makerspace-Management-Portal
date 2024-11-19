import React, { useState } from 'react';
import { Button, Card, CardContent, Modal, Box, TextField, Typography, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid2 from '@mui/material/Grid2'; // Import Grid2 from MUI
import '../styles/reserve_equipment/local.css';
import NavBar from '../Components/NavBar.tsx';
import MainContainer from '../Components/MainContainer.tsx';
<<<<<<< Updated upstream
import { Fab, Tab, Tabs, Stack, Typography, Button, Card, CardContent, CardActionArea, CardActions, Accordion, ButtonGroup, CircularProgress, IconButton, TextField, Input } from '@mui/material';
import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add'
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
=======
>>>>>>> Stashed changes
import { useUser } from '../hooks/UserProvider.tsx';
import BookingCalendar from '../Components/BookingModal.tsx';
<<<<<<< Updated upstream
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
=======
import StarIcon from '@mui/icons-material/Star';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
type Equipment = {
  id: number;
  name: string;
  description: string;
  isUnderMaintenance: boolean;
  isBookable: boolean;
  isPremium: boolean;
>>>>>>> Stashed changes
};

const equipmentModel: Equipment[] = [
  { id: 1, name: '3D Printer', description: 'prints stuff... in 3D!', isUnderMaintenance: false, isBookable: true, isPremium: true },
  { id: 2, name: 'Laser Cutter', description: 'cuts stuff... in 2D!', isUnderMaintenance: false, isBookable: true, isPremium: false },
  { id: 3, name: 'CNC Machine', description: 'machine for precise cutting!', isUnderMaintenance: true, isBookable: true, isPremium: false },
  { id: 4, name: 'Laser Engraver', description: 'engraves materials with laser!', isUnderMaintenance: false, isBookable: true, isPremium: false },
  // Add more items as necessary...
];

const theme = createTheme({
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

<<<<<<< Updated upstream
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
=======
const ModalStyle = {
  overflow: 'hidden',
  position: 'absolute',
  display: 'flex',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '100%', md: 900 },
  height: { xs: '85%', s: '80%', md: 500 },
  bgcolor: 'rgba(255, 255, 255, 0)',
  boxShadow: 80,
  p: { xs: 1, s: 2, md: 4 },
};

const ReserveEquipment = () => {
  const [resultsFound, setResultsFound] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);
  const [displayModel, setDisplayModel] = useState(equipmentModel);
  const { user, setUserByIndex } = useUser();
  const [currentUserRole, setCurrentUserRole] = useState(user.userRole);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    if (event.target.value === '') {
      setDisplayModel(equipmentModel);
    } else {
      const searchExpr = (input: Equipment, searchTerm: string) => {
        const normalizedName = input.name.toLowerCase();
        const normalizedSearchTerm = searchTerm.toLowerCase();
        return normalizedName.includes(normalizedSearchTerm);
      };
      const filteredResults = equipmentModel.filter((elem) =>
        searchExpr(elem, event.target.value)
      );
      setDisplayModel(filteredResults);
      setResultsFound(filteredResults.length > 0);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeUser = () => {
    const nextIndex = (currentUserIndex + 1) % 3;
    setCurrentUserIndex(nextIndex);
    setUserByIndex(nextIndex);
    setCurrentUserRole(user.userRole);
  };

  const ChangeUserButton = () => (
    <Button
      id="debugButton"
      fullWidth={false}
      sx={{ width: '250px', position: 'sticky', bottom: 2, zIndex: 1000 }}
      variant={'contained'}
      onClick={handleChangeUser}
    >
      Change User: {currentUserRole}
    </Button>
  );

  return (
    <>
      <NavBar id="reserve" />
      <MainContainer>
        <ThemeProvider theme={theme}>
          <Box
            id="contentBox"
            sx={{
              position: 'fixed',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
             backgroundColor:'#483E5C',
              padding: 0,
            }}
          >
            <Box sx={{ padding: 3 , justifyContent: 'center',  width: '100%' }}>
              <ChangeUserButton />
              
              <TextField
                placeholder="🔎"
                sx={{ marginTop:2, backgroundColor: 'white' ,  display: 'flex', justifyContent: 'center', width: '100%', borderRadius:2}}
                value={searchText}
                onChange={handleSearch}
              />
            </Box>

            <Modal open={open} onClose={handleClose}>
              <Box sx={ModalStyle} borderColor={'white'}>
                {currentUserRole === 'Admin' ? (
                  <Typography variant="body1">Admins see this</Typography>
                ) : (
                  <BookingCalendar onClose={handleClose} userRole={currentUserRole} />
                )}
              </Box>
            </Modal>

            <Stack spacing={3} sx={{ alignSelf: 'center' }}>
              {displayModel.length === 0 && resultsFound === false ? (
                <Typography>No results found</Typography>
              ) : (
                <Box sx={{ backgroundColor: '#6D657D', padding: 0.1, borderRadius: 2, margin:5}}>
                <Grid2 container spacing={3} sx={{ padding: 3 }}>
                  {displayModel.map((item, index) => (
                    <Grid2 item xs={6} md={3} key={index}>
  
<Card
  sx={{
    border: '0px solid black',
    backgroundColor: theme.palette.primary.main,
    width: '199px',
    height: '199px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    position: 'relative',
    overflow: 'hidden',
    '&:hover .details': {
      opacity: 1, 
      color: 'white', 
    },
    '&:hover .title': {
      opacity: 0,
    },
    '&:hover': {
      backgroundColor: 'black', 
    },
  }}
>
  {/* Conditionally render the star icon if the item is premium */}
  {item.isPremium && (
    <StarIcon
      sx={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        color: 'white', 
        fontSize: '24px', 
      }}
    />
  )}
  
  {/* Conditionally render the maintenance icon if the item is under maintenance */}
  {item.isUnderMaintenance && (
    <PriorityHighIcon
      sx={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        color: 'white', 
        fontSize: '24px', 
      }}
    />
  )}

<CardContent sx={{ textAlign: 'center', position: 'relative' }}>
  <Typography
    className="title" 
    variant="body2"
    sx={{
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold',
      fontSize: '12pt',
      padding: '5px',
      transition: 'opacity 0.3s ease', 
    }}
  >
    {item.name}
  </Typography>
  <Box
    className="details"
    sx={{
      opacity: 0, 
      transition: 'opacity 0.3s ease',
      position: 'absolute',

      top: '50%', 
      left: '50%',
      transform: 'translate(-50%, -50%)', 
      color: theme.palette.primary.contrastText,
      textAlign: 'center', 
    }}
  >
    <Typography variant="body2">{item.description}</Typography>
    <Typography variant="body2">
      Status: {item.isUnderMaintenance ? 'Under Maintenance' : 'Available'}
    </Typography>
    <Typography variant="body2">
      {item.isPremium ? 'Premium Equipment' : 'Standard Equipment'}
    </Typography>
    {item.isBookable && !item.isUnderMaintenance && (
      <Button variant="contained" onClick={handleOpen}>
        Book
      </Button>
    )}
  </Box>
</CardContent>
</Card>

                    </Grid2>
                  ))}
                </Grid2>
                </Box>
              )}
            </Stack>
          </Box>
        </ThemeProvider>
      </MainContainer>
    </>
  );
};
>>>>>>> Stashed changes

export default ReserveEquipment;
