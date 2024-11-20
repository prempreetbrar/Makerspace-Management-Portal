import React, { useState } from 'react';
import { Button, Card, CardContent, Modal, Box, TextField, Typography, Stack, CardActionArea, Chip, CardActions, CardHeader } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid2 from '@mui/material/Grid2'; // Import Grid2 from MUI
import '../styles/reserve_equipment/local.css';
import NavBar from '../Components/NavBar.tsx';
import MainContainer from '../Components/MainContainer.tsx';
import { useUser } from '../hooks/UserProvider.tsx';
import BookingCalendar from '../Components/BookingModal.tsx';

import '../styles/reserve_equipment/local.css';
import zIndex from '@mui/material/styles/zIndex';
import WindowDimensions from '../Components/WindowDimensions.tsx';
import DisguisedButton from '../Components/DisguisedSwitch.tsx';
import ErrorIcon from '@mui/icons-material/Error';
import StarsIcon from '@mui/icons-material/Stars';
import ConditionalWrapper from '../Components/ConditionalWrapper.tsx';

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
const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
const equipmentModel: Equipment[] = [
  { id: 1, name: 'Prussa 3', description: description, isUnderMaintenance: false, isBookable: true, isPremium: true },
  { id: 2, name: 'Laser Cutter', description: description, isUnderMaintenance: false, isBookable: true, isPremium: false },
  { id: 3, name: 'CNC Machine', description: description, isUnderMaintenance: true, isBookable: true, isPremium: false },
  { id: 4, name: 'Laser Engraver', description: description, isUnderMaintenance: false, isBookable: true, isPremium: false },
  { id: 5, name: '3D Printer', description: description, isUnderMaintenance: false, isBookable: true, isPremium: true },
  { id: 6, name: 'Laser Cutter', description: description, isUnderMaintenance: false, isBookable: true, isPremium: false },
  { id: 7, name: 'CNC Machine', description: description, isUnderMaintenance: true, isBookable: true, isPremium: false },
  { id: 8, name: 'Laser Engraver', description: description, isUnderMaintenance: false, isBookable: true, isPremium: false },
  { id: 9, name: '3D Printer', description: 'prints stuff... in 3D!', isUnderMaintenance: false, isBookable: true, isPremium: true },
  { id: 10, name: 'Laser Cutter', description: 'cuts stuff... in 2D!', isUnderMaintenance: false, isBookable: true, isPremium: false },
  { id: 11, name: 'CNC Machine', description: 'machine for precise cutting!', isUnderMaintenance: true, isBookable: true, isPremium: false },
  { id: 12, name: 'Laser Engraver', description: 'engraves materials with laser!', isUnderMaintenance: false, isBookable: true, isPremium: false },
  // Add more items as necessary...
];

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


function userCanBookItem(item: Equipment, userRole: string)
{
    if(item.isPremium)
    {
        return userRole === 'Premium';
    }
    else
    {
        return !item.isUnderMaintenance
    }
}

const ReserveEquipment = () => {
    const {height, width} = WindowDimensions();
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

    const ModalStyle = {
        overflow: 'hidden',
        overflowY: 'scroll',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: width, md: 900 },
        height: {xs: height, md: 600},
        bgcolor: 'rgba(255, 255, 255, 0)',
        boxShadow: 80,
        p: { xs: 1, s: 2, md: 4 },
    };

    const hoverBoxStyle = 
    {
        opacity: 0,
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',

        position: 'absolute',
        backgroundColor: 'black',
        zIndex: 1000,
        width: '350px',
        height: 
        {
            xs: 150,
            md: 225,
        },
        transition: 'opacity 0.3s ease',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: theme.palette.primary.contrastText,
        textAlign: 'left',
    } 
    const equipmentCardStyle =
    {
        border: '0px solid black',
        backgroundColor: "FFFAFA",
        width: '350px',
        boxShadow: 5,
        height: 
        { 
            xs: 150,
            md: 225,
        },
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
    }
    const errorChipStyle = 
    {
        position:
            'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: theme.palette.error.light
    }

    return (
        <>
            <MainContainer>
                <ThemeProvider theme={theme}>
                    <Box
                        id="contentBox"
                        sx={{
                            position: 'fixed',
                            display: 'flex',
                            flexDirection: 'column',
                            width: width,
                            height: height,
                            backgroundColor: '#483E5C',
                            padding: 0,
                            scroll: 'none',
                            overflow: 'hidden',
                        }}>
                        <NavBar id="reserve" />
                        <Box
                            sx={{
                                padding: 3,
                                justifyContent: 'center',
                                width: '100%',
                            }}>
                            <ChangeUserButton />
                            <TextField
                                sx={{
                                    marginTop: 2,
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%',
                                    borderRadius: 2,
                                }}
                                value={searchText}
                                onChange={handleSearch}
                            />
                        </Box>
                        <Modal open={open} onClose={handleClose}>
                            <Box sx={ModalStyle} borderColor={'white'}>
                                <BookingCalendar onClose={handleClose} userRole={currentUserRole}/>
                            </Box>
                        </Modal>
                            {displayModel.length === 0 &&
                            resultsFound === false ? (
                                <Typography>No results found</Typography>
                            ) : (
                                <Box
                                    sx={{
                                        backgroundColor: '#cac5d4',
                                        padding: 0.1,
                                        borderRadius: 2,
                                        margin: 2,
                                        overflowY: 'scroll'
                                    }}
                                >
                                    <Grid2
                                        container
                                        spacing={3}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        sx={{ padding: 3}}>

                                        {displayModel.map((item, index) => (
                                                <Card key={index} sx={equipmentCardStyle}>
                                                    {/* Conditionally render the maintenance icon if the item is under maintenance */}
                                                    <ConditionalWrapper displayCondition={item.isUnderMaintenance}>
                                                        <Chip sx={errorChipStyle}icon={<ErrorIcon fontSize='medium' sx={{color: 'white'}}/>}label = "Out of order" />
                                                    </ConditionalWrapper>
                                                    {/* Conditionally render the star icon if the item is premium */}
                                                    <ConditionalWrapper displayCondition={item.isPremium}>
                                                        <StarsIcon sx={{
                                                                    position:
                                                                        'absolute',
                                                                    top: '10px',
                                                                    right: '10px',
                                                                    fontSize:
                                                                        '30px',
                                                                }}
                                                            />
                                                    </ConditionalWrapper>
                                                    <CardContent sx={{textAlign: 'center', position: 'relative'}}>
                                                        <Typography
                                                            className="title"
                                                            variant="h3"
                                                            sx={{
                                                                color: theme.palette.primary.main,
                                                                fontWeight: 'bold',
                                                                fontSize: '12pt',
                                                                padding: '5px',
                                                                transition: 'opacity 0.2s ease', 
                                                            }}>
                                                            {item.name}
                                                        </Typography>
                                                        <Box id="detailsBox" className="details" sx={hoverBoxStyle}>
                                                            <Box sx={{height: {xs: '150px', md: '157.5px'}}}>
                                                                <Typography variant="body2"  color="white">{item.description} </Typography>
                                                            </Box>
                                                            <ConditionalWrapper displayCondition={userCanBookItem(item, currentUserRole)}>
                                                                    <Button variant="contained" onClick={handleOpen}> Book </Button>
                                                            </ConditionalWrapper>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                        ))}
                                    </Grid2>
                                </Box>
                            )}
                    </Box>
                </ThemeProvider>
            </MainContainer>
        </>
    );
};

export default ReserveEquipment;
