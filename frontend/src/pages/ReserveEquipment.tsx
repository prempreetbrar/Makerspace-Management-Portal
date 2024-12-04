import React, { useState, useContext } from 'react';
import {Button, Card, CardContent, Modal, Box, TextField, Typography, Stack, CardActionArea, Chip, CardActions, CardHeader, colors, FormControl, OutlinedInput, Container, Fab, SxProps, Theme} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid2 from '@mui/material/Grid2'; // Import Grid2 from MUI
import '../styles/reserve_equipment/local.css';
import NavBar from '../Components/NavBar.tsx';
import MainContainer from '../Components/MainContainer.tsx';
import { useUser } from '../hooks/UserProvider.tsx';
import BookingCalendar from '../Components/ReserveEquipmentPage/BookingModal.tsx';
import SearchIcon from '@mui/icons-material/Search'
// These are stub-ins. Images are saved on the server side
import ThreeDPrinterIcon from '../assets/3D_printer.svg';
import LaserCutterIcon from '../assets/laser_cutter.svg';
import CNCMillIcon from '../assets/laser_cutter.svg';
import MakerbotReplicatorImg from '../assets/mb_replicator.jpeg';
import '../styles/reserve_equipment/local.css';
import zIndex from '@mui/material/styles/zIndex';
import WindowDimensions from '../Components/WindowDimensions.tsx';
import DisguisedButton from '../Components/DisguisedSwitch.tsx';
import ErrorIcon from '@mui/icons-material/Error';
import PremiumBadge from '../Components/ReserveEquipmentPage/PremiumBadge.tsx';
import ConditionalWrapper from '../Components/ConditionalWrapper.tsx';
import {AuthContext,UserRoles} from '../contexts/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios.ts';
import SearchBar from '../Components/SearchBar.tsx';
import { EquipmentContext, EquipmentDataProvider } from '../contexts/EquipmentContext.tsx';
// a fallback state in case we are provided with bad context
import SyncIcon from '@mui/icons-material/Sync'
import BookingModal from '../Components/ReserveEquipmentPage/BookingModal.tsx';
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

type Equipment = {
    id: number,
    name: string,
    description: string,
    isUnderMaintenance: boolean,
    isPremium: boolean,
    isBookable: boolean,
    icon?: any,
    setUnderMaintenance?: (value: boolean) => void;
};

const IconStyle: React.CSSProperties = {
    width: '80px',
    height: '80px',
    top: '30px',
    left: '135px',
};

const equipmentCardWidth = {
    xs: '350px',
    md: '225px',
};

const hoverBoxStyle = {
    opacity: 0,
    padding: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    position: 'absolute',
    backgroundColor: 'black',
    zIndex: 20,
    width: equipmentCardWidth,
    height: {
        xs: 150,
        md: 225,
    },
    transition: 'opacity 0.3s ease',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: theme.palette.primary.contrastText,
    textAlign: 'left',
};


const errorChipStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: theme.palette.error.light,
    color: 'white',
};


function userCanBookItem(item: Equipment, userRole: string | undefined) {
    const baseCheck = !item.isUnderMaintenance && item.isBookable;
    console.log(`${item.name} is bookable:  ${item.isBookable}`);
    console.log(`${item.name} is bookable:  ${baseCheck}`);
    if (userRole === undefined) {
        console.log('role is undefined');
        return false;
    } else if (item.isPremium) {
        return (userRole === UserRoles.PREMIUM && baseCheck);
    } else {
        return baseCheck;
    }
}

interface SpinningButtonProps
{
    spinning: boolean,
    onClick: ()=> void
}

const SpinningButton = ({spinning, onClick}:SpinningButtonProps) =>
{
    return(
            <Fab onClick={onClick} color='primary' variant='extended'
                sx={{ position: 'fixed', bottom: '3%', right: '5%'}}>
                    <Typography fontWeight={500} pr={1} > Update </Typography>
                <SyncIcon sx={{color:'white', 
                    animation: spinning ? 'spin 1s linear infinite' : 'none',
                    transform: 'rotate(-90deg)',
                    '@keyframes spin': 
                    {
                        '0%': { transform: 'rotate(-90deg)' },
                        '25%': {transform: 'rotate(-180deg)'},
                        '50%': { transform: 'rotate(-270deg)' },
                        '75%': { transform: 'rotate(-360 deg)' },
                        '100%': { transform: 'rotate(-450deg)' }
                    },
                    transition: 'transform 8s ease'
                }} />
        </Fab>)
}
function timeout(delay: number)
{
    return new Promise(res =>setTimeout(res, delay));
}

const ReserveEquipment = () => {
    const { user } = useContext(AuthContext)!;
    const userProviderContext = useUser(); // dummy context
    const { height, width } = WindowDimensions();
    const [resultsFound, setResultsFound] = useState(true);
    const [searchText, setSearchText] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [displayModel, setDisplayModel] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState(false);
    const equipmentModel = React.useRef<Equipment[]>([]); // this is the entire equipment model. It doesn't change unless updated, and 
    const [selectedEquipmentID, setSelectedEquipmentID] = useState(-1); // Using -1 will prevent any "undefined" errors.
    const [spinning, setSpinning] = useState(false);
    const [sync, setSync] = useState(false); // the state of this variable doesn't matter
    const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false);
    const handleSearch = () => {
        if (searchText === '') {
            setDisplayModel(equipmentModel.current);
        } else {
            const searchExpr = (input: Equipment, searchTerm: string) => {
                const normalizedName = input.name.toLowerCase();
                const normalizedSearchTerm = searchTerm.toLowerCase();
                return normalizedName.includes(normalizedSearchTerm);
            };
            const filteredResults = equipmentModel.current.filter((elem) =>
                searchExpr(elem, searchText)
            );
            setDisplayModel(filteredResults);
        }
    };

    const updateSearchBar = (event: React.ChangeEvent<HTMLInputElement>)=>
    {
        if(event.target.value != searchText)
        {
            setDisplayModel(equipmentModel.current);
        }
        setSearchText(event.target.value);
    }

    async function syncData()
    {
        if(!spinning)
        {
            try {
                setSpinning(true);
                const response = await axiosInstance.get('/equipment');
                console.log(`Fetched ${response.data.equipment.length} equipment entries`);
                equipmentModel.current = response.data.equipment;
                console.log(response.data.equipment);
                setDisplayModel(equipmentModel.current);
            } catch (error: any) {
                console.log('Failed to fetch equipment');
                console.error(error.response.data);
            }
            finally
            {
                await timeout(1500); // remove artificial delay later
                setLoading(false);
                setSpinning(false);
                console.log(spinning);
            }
        }
    }

    React.useEffect(() => {
        const fetchEquipment = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/equipment');
                console.log(`Fetched ${response.data.equipment.length} equipment entries`);
                equipmentModel.current = response.data.equipment; //
                console.log(response.data.equipment);
                setDisplayModel(equipmentModel.current);
             

            } catch (error: any) {
                console.log('Failed to fetch equipment');
                console.error(error.response.data);
            }
            finally
            {
                setLoading(false);
            }
        }
        fetchEquipment();
    }, []);

    const handleOpen = (equipment: Equipment) => 
    {
        console.log(`Equipment name: ${equipment.name}`);
        console.log(`Equipment ID: ${equipment.id}`);
        //setEquipmentData({id: equipment.id, name: equipment.name, isPremium: equipment.isPremium}); // pass the context to the child. 
        setSelectedEquipmentID(equipment.id);
        setOpen(true);
    }
    // the BookingModal component will handle the logic of registering booking separately.

    const handleClose = () => 
    {
        setOpen(false);
        setSelectedEquipmentID(-1);
    }

    const handleSubmit = () =>
    {
        setOpen(false);
        setSelectedEquipmentID(-1);
    }
    function openMaintenanceDialog()
    {
        setMaintenanceDialogOpen(true);
    }

    function handleChangeMaintenanceStatus(equipment: Equipment)
    {
        
    }
    return (
        <>
            <MainContainer>
                <ThemeProvider theme={theme}>
                <BookingModal open={open} equipmentID={selectedEquipmentID} onClose={handleClose} onSubmit={handleSubmit}/>
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
                                padding: 
                                {
                                    xs: 1.5,
                                    md: 3,
                                },
                                justifyContent: 'center',
                                width: '100%',
                            }} >
                            <Typography color={theme.palette.primary.contrastText} sx={{pl: 2}}>Find Equipment for YOUR job</Typography>
                            <SearchBar value={searchText} onChange={updateSearchBar} onSubmit={handleSearch}/>
                        </Box>
                        
                        <Box sx={{
                            backgroundColor: '#cac5d4', 
                            padding: 0.1,
                            borderRadius: 2, 
                            margin: 2, 
                            overflowY: 'scroll',
                            transition: 'flex-grow 3s ease'
                            }}>
                            <Grid2 container spacing={3} justifyContent={'center'} alignItems={'center'} sx={{ 
                                padding: 3, transition: 'height 3s ease'
                            }}>
                                {displayModel.length > 0 ? (
                                    displayModel.map((item, index) => (
                                    <Card key={index} sx={
                                        {
                                            border: '0px solid black',
                                            backgroundColor: 'FFFAFA',
                                            width: equipmentCardWidth,
                                            boxShadow: 5,
                                            height: {
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
                                    }>
                                        {/* Conditionally render the maintenance icon if the item is under maintenance */}
                                        <ConditionalWrapper displayCondition={item.isUnderMaintenance}>
                                            <Chip sx={errorChipStyle} icon={<ErrorIcon fontSize="medium" sx={{ color: 'white'}}/>} label="Out of order"/>
                                        </ConditionalWrapper>
                                        {/* Conditionally render the star icon if the item is premium */}
                                        <ConditionalWrapper displayCondition={item.isPremium}>
                                            <PremiumBadge />
                                        </ConditionalWrapper>
                                        <CardContent sx={{ textAlign: 'center', position: 'static', }} >
                                            <ConditionalWrapper displayCondition={ item.icon !== undefined}>
                                                <Box component='img' src={item.icon} style={IconStyle} alt={item.name} />
                                            </ConditionalWrapper>
                                            <Typography className="title" variant="h3"
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
                                                    <Typography variant="body2" color="white">
                                                        {item.description}
                                                    </Typography>
                                                </Box>
                                                <Box display="flex" flexDirection="column" alignContent={'center'}>
                                                    <ConditionalWrapper displayCondition={user?.userRole ===UserRoles.ADMIN && item.isBookable}>
                                                        <Button sx={{opacity: 100, zIndex: 30 }} variant="contained" onClick={()=>handleChangeMaintenanceStatus(item)}>
                                                            {item.isUnderMaintenance ? (<>Enable Booking </>) : (<>Disable Booking</>)}
                                                        </Button>
                                                    </ConditionalWrapper>
                                                    <ConditionalWrapper displayCondition={userCanBookItem(item, user?.userRole)}>
                                                        <Button sx={{ opacity: 100, zIndex: 30 }} variant="contained" onClick={()=>{handleOpen(item)}}>
                                                            Book
                                                        </Button>
                                                    </ConditionalWrapper>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))) : ( <Typography> No results found</Typography>)}
                            </Grid2>
                        </Box>
                    </Box>
                    <SpinningButton spinning={spinning} onClick={syncData}/>
                </ThemeProvider>
            </MainContainer>
        </>
    );
};

export default ReserveEquipment;
