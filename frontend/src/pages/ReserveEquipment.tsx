import React, { useState, useContext } from 'react';
import {
    Button,
    Card,
    CardContent,
    Modal,
    Box,
    TextField,
    Typography,
    Stack,
    CardActionArea,
    Chip,
    CardActions,
    CardHeader,
    colors,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid2 from '@mui/material/Grid2'; // Import Grid2 from MUI
import '../styles/reserve_equipment/local.css';
import NavBar from '../Components/NavBar.tsx';
import MainContainer from '../Components/MainContainer.tsx';
import { useUser } from '../hooks/UserProvider.tsx';
import BookingCalendar from '../Components/ReserveEquipmentPage/BookingModal.tsx';

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
import StarsIcon from '@mui/icons-material/Stars';
import ConditionalWrapper from '../Components/ConditionalWrapper.tsx';
import {
    AuthContext,
    AuthProvider,
    User,
    UserRoles,
} from '../contexts/AuthContext.tsx';
import { UserProvider } from '../hooks/UserProvider.tsx';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios.ts';
import axios, { AxiosError } from 'axios';
import { Search } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';

// a fallback state in case we are provided with bad context

const axiosHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
};

type Equipment = {
    id: number;
    name: string;
    description: string;
    isUnderMaintenance: boolean;
    isBookable: boolean;
    isPremium: boolean;
    icon?: any;
    setUnderMaintenece?: (value: boolean) => void;
};

type Booking = {
    id: number;
    userEmail: string;
    equipmentID: number;
    bookingDateTime: Date;
    bookingDuration: number;
};
const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const equipmentModel: Equipment[] = [
    {
        id: 1,
        name: '3D Printer',
        description: description,
        isUnderMaintenance: false,
        isBookable: true,
        isPremium: false,
        icon: ThreeDPrinterIcon,
    },
    {
        id: 2,
        name: 'Laser Cutter',
        description: description,
        isUnderMaintenance: false,
        isBookable: true,
        isPremium: false,
        icon: LaserCutterIcon,
    },
    {
        id: 3,
        name: 'CNC Machine',
        description: description,
        isUnderMaintenance: true,
        isBookable: true,
        isPremium: false,
        icon: CNCMillIcon,
    },
    {
        id: 4,
        name: 'Laser Engraver',
        description: description,
        isUnderMaintenance: false,
        isBookable: true,
        isPremium: false,
    },
    {
        id: 5,
        name: 'Makerbot Replicator+',
        description: description,
        isUnderMaintenance: false,
        isBookable: true,
        isPremium: true,
        icon: MakerbotReplicatorImg,
    },
    {
        id: 6,
        name: 'Laser Cutter',
        description: description,
        isUnderMaintenance: false,
        isBookable: true,
        isPremium: false,
        icon: LaserCutterIcon,
    },
    {
        id: 7,
        name: 'CNC Machine',
        description: description,
        isUnderMaintenance: true,
        isBookable: true,
        isPremium: false,
        icon: CNCMillIcon,
    },
    {
        id: 8,
        name: 'Laser Engraver',
        description: description,
        isUnderMaintenance: false,
        isBookable: true,
        isPremium: false,
    },
    {
        id: 9,
        name: 'Makerbot Replicator',
        description: description,
        isUnderMaintenance: false,
        isBookable: true,
        isPremium: true,
        icon: ThreeDPrinterIcon,
    },
    {
        id: 10,
        name: 'Laser Cutter',
        description: description,
        isUnderMaintenance: false,
        isBookable: true,
        isPremium: false,
        icon: LaserCutterIcon,
    },
    {
        id: 11,
        name: 'CNC Machine',
        description: description,
        isUnderMaintenance: false,
        isBookable: true,
        isPremium: false,
        icon: CNCMillIcon,
    },
    {
        id: 12,
        name: 'Laser Engraver',
        description: description,
        isUnderMaintenance: false,
        isBookable: true,
        isPremium: false,
    },
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

function userCanBookItem(item: Equipment, userRole: string | undefined) {
    if (userRole === undefined) {
        console.log('role is undefined');
        return false;
    } else if (item.isPremium) {
        return userRole === 'Premium';
    } else {
        return !item.isUnderMaintenance;
    }
}

const ReserveEquipment = () => {
    // Note to graders: some of these hooks are for debugging purposes only, to make sure that the layout and different views
    // will work correctly when connected to the backend.
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)!;
    // BLOCKED: Cannot deal with "possibly undefined" and "possibly null" -> when does this happen?
    const userProviderContext = useUser(); // dummy context
    const { height, width } = WindowDimensions();
    const [resultsFound, setResultsFound] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [open, setOpen] = useState(false);
    const [equipModel, setEquipModel] = useState<any>(undefined); // I don't know what the equipment model is
    const [displayModel, setDisplayModel] = useState(equipmentModel);
    const [loading, setLoading] = useState(false);
    const [searchParams, _] = useSearchParams();

    function handleChangeUser() {
        userProviderContext.setUser();
    }

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
    React.useEffect(() => {
        if (
            // when user upgrades to premium, there's a split second where they are undefined while we fetch stuff from
            // the backend. Don't just kick them out.
            searchParams.get('checkout') === null &&
            (user === null || user === undefined)
        ) {
            navigate('/'); // just go home.
        }
    }, [user, navigate, userProviderContext]);

    React.useEffect(() => {
        setLoading(true);
        const fetchEquipment = async () => {
            try {
                const response = await axiosInstance.get('/equipment');
                setEquipModel(response.data);
                console.log(equipModel);
                /* BLOCKED:
                 * What is the format of the response?
                 * What is the type of error?
                 * How do I make this update?
                 */
            } catch (error: any) {
                console.log('Failed to fetch equipment');
                console.error(error.response.data);
            }
        };
        fetchEquipment();
    }, [loading]);
    console.log(equipModel);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const IconStyle: React.CSSProperties = {
        width: '80px',
        height: '80px',
        top: '30px',
        left: '135px',
    };
    const SearchBar = () => {
        return (
            <TextField
                sx={{
                    marginTop: 2,
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    borderRadius: 2,
                }}
                placeholder="Search for equipment..."
                value={searchText}
                onChange={handleSearch}
            />
        );
    };

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
        height: { xs: height, md: 600 },
        bgcolor: 'rgba(255, 255, 255, 0)',
        boxShadow: 80,
        p: { xs: 1, s: 2, md: 4 },
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

    const equipmentCardStyle = {
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
    };

    const errorChipStyle = {
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: theme.palette.error.light,
        color: 'white',
    };

    // Why would user be null or undefined??
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
                        }}
                    >
                        <NavBar id="reserve" />
                        <Box
                            sx={{
                                padding: 3,
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={userProviderContext.setUser}
                            >
                                Change User: {userProviderContext.user.userRole}{' '}
                            </Button>
                            <SearchBar />
                        </Box>
                        <Modal open={open} onClose={handleClose}>
                            <Box sx={ModalStyle} borderColor={'white'}>
                                <BookingCalendar
                                    onClose={handleClose}
                                    onSubmit={handleClose}
                                    userRole={userProviderContext.user.userRole}
                                />
                            </Box>
                        </Modal>
                        {displayModel.length === 0 && resultsFound === false ? (
                            <Typography>No results found</Typography>
                        ) : (
                            <Box
                                sx={{
                                    backgroundColor: '#cac5d4',
                                    padding: 0.1,
                                    borderRadius: 2,
                                    margin: 2,
                                    overflowY: 'scroll',
                                }}
                            >
                                <Grid2
                                    container
                                    spacing={3}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    sx={{ padding: 3 }}
                                >
                                    {displayModel.map((item, index) => (
                                        <Card
                                            key={index}
                                            sx={equipmentCardStyle}
                                        >
                                            {/* Conditionally render the maintenance icon if the item is under maintenance */}
                                            <ConditionalWrapper
                                                displayCondition={
                                                    item.isUnderMaintenance
                                                }
                                            >
                                                <Chip
                                                    sx={errorChipStyle}
                                                    icon={
                                                        <ErrorIcon
                                                            fontSize="medium"
                                                            sx={{
                                                                color: 'white',
                                                            }}
                                                        />
                                                    }
                                                    label="Out of order"
                                                />
                                            </ConditionalWrapper>
                                            {/* Conditionally render the star icon if the item is premium */}
                                            <ConditionalWrapper
                                                displayCondition={
                                                    item.isPremium
                                                }
                                            >
                                                <StarsIcon
                                                    sx={{
                                                        position: 'absolute',
                                                        top: '10px',
                                                        right: '10px',
                                                        fontSize: '30px',
                                                        color: '#e3c011',
                                                        borderRadius: '30px',
                                                    }}
                                                />
                                            </ConditionalWrapper>
                                            <CardContent
                                                sx={{
                                                    textAlign: 'center',
                                                    position: 'static',
                                                }}
                                            >
                                                <ConditionalWrapper
                                                    displayCondition={
                                                        item.icon !== undefined
                                                    }
                                                >
                                                    <img
                                                        src={item.icon}
                                                        style={IconStyle}
                                                        alt={item.name}
                                                    ></img>
                                                </ConditionalWrapper>
                                                <Typography
                                                    className="title"
                                                    variant="h3"
                                                    sx={{
                                                        color: theme.palette
                                                            .primary.main,
                                                        fontWeight: 'bold',
                                                        fontSize: '12pt',
                                                        padding: '5px',
                                                        transition:
                                                            'opacity 0.2s ease',
                                                    }}
                                                >
                                                    {item.name}
                                                </Typography>
                                                <Box
                                                    id="detailsBox"
                                                    className="details"
                                                    sx={hoverBoxStyle}
                                                >
                                                    <Box
                                                        sx={{
                                                            height: {
                                                                xs: '150px',
                                                                md: '157.5px',
                                                            },
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            color="white"
                                                        >
                                                            {item.description}{' '}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        display="flex"
                                                        flexDirection="column"
                                                        alignContent={'center'}
                                                    >
                                                        <ConditionalWrapper
                                                            displayCondition={
                                                                user?.userRole ===
                                                                UserRoles.ADMIN
                                                            }
                                                        >
                                                            <Button
                                                                sx={{
                                                                    opacity: 100,
                                                                    zIndex: 30,
                                                                }}
                                                                variant="contained"
                                                            >
                                                                {item.isUnderMaintenance ? (
                                                                    <>
                                                                        Enable
                                                                        Booking
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        Disable
                                                                        Booking
                                                                    </>
                                                                )}
                                                            </Button>
                                                        </ConditionalWrapper>
                                                        <ConditionalWrapper
                                                            displayCondition={userCanBookItem(
                                                                item,
                                                                user?.userRole
                                                            )}
                                                        >
                                                            <Button
                                                                sx={{
                                                                    opacity: 100,
                                                                    zIndex: 30,
                                                                }}
                                                                variant="contained"
                                                                onClick={
                                                                    handleOpen
                                                                }
                                                            >
                                                                {' '}
                                                                Book{' '}
                                                            </Button>
                                                        </ConditionalWrapper>
                                                    </Box>
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
