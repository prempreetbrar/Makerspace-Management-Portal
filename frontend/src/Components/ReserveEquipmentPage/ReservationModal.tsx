import React, { useEffect, useState } from 'react';
import {
    Modal,
    Box,
    Button,
    Grid2,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    TextField,
    Input,
    Backdrop,
    IconButton,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from '../../axios';
import { Booking } from '../../models';
import { useSnackbar } from '../../contexts/SnackbarProvider.tsx';
import zIndex from '@mui/material/styles/zIndex';
import CloseIcon from '@mui/icons-material/Close';

interface EditBookingProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    equipmentID: number;
}

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    textAlign: 'left',
    width: '850px',
    zIndex: 1000,
};

const buttonStyles = {
    close: {
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid #ddd',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
        marginRight: '8px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#f1f1f1',
        },
        width: '100px',
        borderRadius: 2,
    },
    continue: {
        backgroundColor: 'black',
        color: 'white',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.4)',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#333',
        },
        width: '100px',
        borderRadius: 2,
        '&.Mui-disabled': {
            backgroundColor: '#d3d3d3',
            color: '#9e9e9e',
        },
    },
};

const EditBookingModal: React.FC<EditBookingProps> = ({
    open,
    onClose,
    onConfirm,
    equipmentID,
}) => {
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [titleValue, setTitleValue] = useState<string>('');
    const [descriptionValue, setDescriptionValue] = useState<string>('');

    const { showSnackbar } = useSnackbar();

    const timeSlots = [
        '8:00AM',
        '9:00AM',
        '10:00AM',
        '11:00AM',
        '12:00PM',
        '1:00PM',
        '2:00PM',
        '3:00PM',
        '4:00PM',
        '5:00PM',
        '6:00PM',
        '7:00PM',
    ];

    const isConfirmDisabled =
        !descriptionValue.trim() || // Checks if descriptionValue is empty
        !titleValue.trim() || // Checks if titleValue is empty
        !selectedDate || // Checks if a date is not selected
        !selectedTime; // Checks if a time is not selected

    // Utility to format API times
    const formatApiTimes = (apiTimes: string[]) =>
        apiTimes.map((time) => dayjs(time, 'HH:mm:ss').format('h:mmA'));

    const formatDateForApi = (date: Dayjs | null): string | null => {
        if (!date) return null;
        return date.format('YYYY-MM-DD');
    };

    const formatTimeForApi = (time: string | null): string | null => {
        if (!time) return null;

        // Parse time string (e.g., "8:00AM") and reformat to 24-hour time
        const timeParsed = dayjs(time, 'h:mmA');
        if (!timeParsed.isValid()) return null;

        return timeParsed.format('HH:mm');
    };

    // Fetch available dates when modal opens
    useEffect(() => {
        const fetchData = async () => {
            if (equipmentID) {
                try {
                    console.log(equipmentID);
                    const response = await axios.get(
                        `/bookings/days?equipmentID=${equipmentID}`
                    );
                    setAvailableDates(response.data.availableBookingDays);
                    setAvailableDates((prevList) => [...prevList]);
                } catch (error) {
                    console.error('Failed to fetch available dates:', error);
                }
            }
        };

        if (open) {
            fetchData();
            console.log(availableDates);
        }
    }, [open]);

    // Fetch available time slots when a date is selected
    useEffect(() => {
        const fetchData = async () => {
            if (selectedDate) {
                try {
                    const response = await axios.get(
                        `/bookings/slots?equipmentID=${equipmentID}&bookingDate=${selectedDate.format(
                            'YYYY-MM-DD'
                        )}`
                    );
                    const formattedSlots = formatApiTimes(
                        response.data.availableBookingSlots
                    );
                    setAvailableTimeSlots(formattedSlots);
                    console.log(selectedDate);
                    console.log(availableTimeSlots);
                } catch (error) {
                    console.error(
                        'Failed to fetch available time slots:',
                        error
                    );
                }
            }
        };
        if (open) {
            fetchData();
            setSelectedTime(null);
        }
    }, [selectedDate, open]);

    useEffect(() => {
        setSelectedDate(null);
        setSelectedTime(null);
        setAvailableTimeSlots([]);
        setDescriptionValue('');
        setTitleValue('');
    }, [onClose]);

    const shouldDisableDate = (date: Dayjs | null) => {
        if (!date) return true;
        const formattedDate = date.format('YYYY-MM-DD');
        return !availableDates.includes(formattedDate);
    };

    const handleTimeChange = (
        event: React.MouseEvent<HTMLElement>,
        newTime: string | null
    ) => {
        if (newTime) {
            setSelectedTime(newTime);
        }
    };

    const handleReserveBooking = async (equipmentIDValue: number) => {
        console.log(
            `Reserving equipment with ID:${equipmentIDValue} on ${formatDateForApi(selectedDate)} ${selectedTime}`
        );
        try {
            await axios.post('/bookings', {
                equipmentID: equipmentIDValue,
                bookingDate: formatDateForApi(selectedDate),
                timeSlot1: formatTimeForApi(selectedTime),
                title: titleValue,
                description: descriptionValue,
            });
            showSnackbar('Successfully reserved equipment!');
            onConfirm();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showSnackbar(error.response?.data.message);
            }
        }
    };

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <>
                    <Box sx={style}>
                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: '35px',
                                right: '35px',
                            }}
                            onClick={onClose}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Grid2 container spacing={3}>
                            <Grid2 size="auto">
                                <Typography
                                    variant="h5"
                                    sx={{
                                        //marginTop: 1,
                                        fontSize: 30,
                                        fontWeight: 10000,
                                        color: '#49454F',
                                        mb: 2,
                                    }}
                                >
                                    Reserve Equipment
                                </Typography>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DateCalendar
                                        value={selectedDate}
                                        onChange={(newDate) =>
                                            setSelectedDate(newDate)
                                        }
                                        shouldDisableDate={shouldDisableDate}
                                        sx={{
                                            backgroundColor: '#ECE6F0',
                                            borderRadius: 4,
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid2>
                            <Grid2
                                size="grow"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            marginTop: 2,
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: '#49454F',
                                        }}
                                    >
                                        Available Times
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap', // Allows buttons to wrap to the next line
                                            justifyContent: 'center', // Center align horizontally

                                            gap: 1, // Spacing between buttons
                                        }}
                                    >
                                        <ToggleButtonGroup
                                            value={selectedTime}
                                            exclusive
                                            onChange={handleTimeChange}
                                            aria-label="time slots"
                                            sx={{
                                                '& .MuiToggleButtonGroup-grouped':
                                                    {
                                                        display: 'flex',
                                                        margin: 0, // Adds spacing between buttons
                                                        border: '1px solid ', // Optional: Adds border to each button
                                                        borderRadius: '4px', // Ensures rounded corners
                                                        borderLeft:
                                                            '1px solid !important',
                                                    },
                                                display: 'flex',
                                                flexWrap: 'wrap', // Allows buttons to wrap
                                                gap: 1, // Space between buttons
                                                justifyContent: 'flex-start',
                                            }}
                                        >
                                            {timeSlots.map((slot) => (
                                                <ToggleButton
                                                    key={slot}
                                                    value={slot}
                                                    disabled={
                                                        !availableTimeSlots.includes(
                                                            slot
                                                        )
                                                    }
                                                    aria-label={slot}
                                                    sx={{
                                                        padding: '4px 8px',
                                                        fontSize: '0.75rem',
                                                        minWidth: '50px',
                                                        height: 35,
                                                        width: 100,
                                                        color: '#65558F',
                                                        '&.Mui-selected': {
                                                            backgroundColor:
                                                                '#65558F',
                                                            color: '#fff',
                                                            borderColor:
                                                                '#65558F',
                                                        },
                                                        '&.Mui-selected:hover':
                                                            {
                                                                backgroundColor:
                                                                    '#65558F', // Slightly darker green on hover when active
                                                            },
                                                        '&.Mui-disabled': {
                                                            backgroundColor:
                                                                'clear',
                                                            color: '#CAC4D0',
                                                            borderColor:
                                                                '#CAC4D0',
                                                            cursor: 'not-allowed',
                                                        },
                                                    }}
                                                >
                                                    {slot}
                                                </ToggleButton>
                                            ))}
                                        </ToggleButtonGroup>
                                    </Box>

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            marginTop: 2,
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: '#49454F',
                                        }}
                                    >
                                        Title
                                    </Typography>
                                    <TextField
                                        sx={{
                                            mb: '10px',
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: '#E5E5EA',
                                            },
                                            '& .MuiInputBase-input': {
                                                fontSize: 14,
                                            },
                                        }}
                                        slotProps={{
                                            input: {
                                                inputProps: {
                                                    maxLength: 50,
                                                },
                                            },
                                        }}
                                        placeholder="Reservation Title"
                                        fullWidth
                                        value={titleValue}
                                        onChange={(e) => {
                                            setTitleValue(e.target.value);
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            marginTop: 2,
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: '#49454F',
                                        }}
                                    >
                                        Description
                                    </Typography>
                                    <TextField
                                        multiline
                                        fullWidth
                                        placeholder="Details"
                                        rows={4}
                                        value={descriptionValue}
                                        onChange={(e) => {
                                            setDescriptionValue(e.target.value);
                                        }}
                                        sx={{
                                            mb: '20px',
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: '#E5E5EA',
                                            },
                                            '& .MuiInputBase-input': {
                                                fontSize: 14,
                                            },
                                        }}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Button
                                        sx={buttonStyles.close}
                                        onClick={onClose}
                                    >
                                        Report Issue
                                    </Button>
                                    <Button
                                        disabled={isConfirmDisabled}
                                        sx={buttonStyles.continue}
                                        onClick={() => {
                                            handleReserveBooking(equipmentID);
                                        }}
                                    >
                                        Confirm
                                    </Button>
                                </Box>
                            </Grid2>
                        </Grid2>
                    </Box>
                </>
            </Modal>
        </>
    );
};

export default EditBookingModal;
