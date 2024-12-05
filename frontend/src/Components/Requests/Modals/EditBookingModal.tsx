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
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from '../../../axios';
import { Booking } from '../../../models';

interface EditBookingProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    booking: Booking | null;
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
    width: '700px',
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
    },
};

const EditBookingModal: React.FC<EditBookingProps> = ({
    open,
    onClose,
    onConfirm,
    booking,
}) => {
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
        dayjs(booking?.bookingDate)
    );
    const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

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

    // Utility to format API times
    const formatApiTimes = (apiTimes: string[]) =>
        apiTimes.map((time) => dayjs(time, 'HH:mm:ss').format('h:mmA'));

    // Fetch available dates when modal opens
    useEffect(() => {
        const fetchData = async () => {
            if (booking?.equipment?.id) {
                try {
                    const response = await axios.get(
                        `/bookings/days?equipmentID=${booking.equipment.id}`
                    );
                    setAvailableDates(response.data.availableBookingDays);
                    setAvailableDates((prevList) => [
                        ...prevList,
                        booking?.bookingDate,
                    ]);
                } catch (error) {
                    console.error('Failed to fetch available dates:', error);
                }
            }
        };

        if (open) {
            fetchData();
        }
    }, [booking, open]);

    // Fetch available time slots when a date is selected
    useEffect(() => {
        const fetchData = async () => {
            if (selectedDate) {
                try {
                    const response = await axios.get(
                        `/bookings/slots?equipmentID=${booking?.equipment?.id}&bookingDate=${selectedDate.format(
                            'YYYY-MM-DD'
                        )}`
                    );
                    const formattedSlots = formatApiTimes(
                        response.data.availableBookingSlots
                    );
                    setAvailableTimeSlots(formattedSlots);
                    console.log(selectedDate);
                    console.log(booking?.bookingDate);
                    if (
                        selectedDate.format('YYYY-MM-DD') ===
                        booking?.bookingDate
                    ) {
                        setAvailableTimeSlots(timeSlots);
                    }
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
        }
    }, [selectedDate, open]);

    useEffect(() => {
        setSelectedDate(null);
        setSelectedTime(null);
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

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Grid2 container spacing={3}>
                    <Grid2 size="auto">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                value={selectedDate}
                                onChange={(newDate) => setSelectedDate(newDate)}
                                shouldDisableDate={shouldDisableDate}
                            />
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 size="auto">
                        <ToggleButtonGroup
                            value={selectedTime}
                            exclusive
                            onChange={handleTimeChange}
                            orientation="vertical"
                            aria-label="time slots"
                        >
                            {timeSlots.map((slot) => (
                                <ToggleButton
                                    key={slot}
                                    value={slot}
                                    disabled={
                                        !availableTimeSlots.includes(slot)
                                    }
                                    aria-label={slot}
                                    sx={{
                                        padding: '4px 8px',
                                        fontSize: '0.75rem',
                                        minWidth: '50px',
                                        height: '30px',
                                    }}
                                >
                                    {slot}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </Grid2>
                    <Grid2
                        size="grow"
                        sx={{ display: 'flex', flexDirection: 'column' }}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                            }}
                        >
                            <Typography variant="h5" sx={{ mb: '15px' }}>
                                Edit Booking
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: '600' }}
                            >
                                Title
                            </Typography>
                            <TextField
                                size="small"
                                sx={{ mb: '10px' }}
                                defaultValue={booking?.title || ''}
                            />
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: '600' }}
                            >
                                Description
                            </Typography>
                            <TextField
                                size="small"
                                multiline
                                rows={4}
                                defaultValue={booking?.description || ''}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Button sx={buttonStyles.close} onClick={onClose}>
                                Close
                            </Button>
                            <Button sx={buttonStyles.continue}>Continue</Button>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
        </Modal>
    );
};

export default EditBookingModal;
