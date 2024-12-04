import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    Grid2,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { Booking } from '../../models.ts';

interface MobileRequestCardProps {
    booking: Booking;
    userRole: string | undefined;
    handleDelete?: () => void;
    handleReject?: () => void;
    handleAccept?: () => void;
}

const MobileRequestCard: React.FC<MobileRequestCardProps> = ({
    booking,
    userRole,
    handleDelete,
    handleReject,
    handleAccept,
}) => {
    const [isSwiped, setIsSwiped] = useState(false);

    const IconStyle: React.CSSProperties = {
        width: '100px',
        height: '100px',
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => setIsSwiped(true),
        onSwipedRight: () => setIsSwiped(false),
        preventScrollOnSwipe: true,
    });

    useEffect(() => {
        setIsSwiped(false);
    }, [booking]);

    //console.log('User Prop in MobileRequestCard:', user);

    return (
        <div
            className="card-container"
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '10px',
                width: '100%',
            }}
        >
            <Box
                {...swipeHandlers}
                sx={{
                    position: 'relative',
                    display: 'flex',
                    width: '100%',
                    backgroundColor: '#E7E0EC',
                    borderRadius: 7,
                    overflow: 'hidden',
                }}
            >
                {isSwiped && (
                    <Box
                        sx={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    >
                        {booking.status === 'pending' &&
                            userRole === 'admin' && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor:
                                            userRole === 'admin'
                                                ? '#14AE5C'
                                                : '#E8B931',
                                        width: '50%',
                                        height: '100%',
                                    }}
                                    onClick={() => {
                                        handleAccept?.();
                                        setIsSwiped(false);
                                    }}
                                >
                                    <IconButton
                                        onClick={() => {
                                            handleAccept?.();
                                            setIsSwiped(false);
                                        }}
                                    >
                                        <CheckIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                </Box>
                            )}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#B3261E',
                                width:
                                    booking.status === 'pending' &&
                                    userRole === 'admin'
                                        ? '50%'
                                        : '100%',
                                height: '100%',
                            }}
                            onClick={() => {
                                if (userRole === 'admin') {
                                    console.log('hi');
                                    handleReject?.();
                                } else {
                                    handleDelete?.();
                                }
                                setIsSwiped(false);
                            }}
                        >
                            <IconButton
                                onClick={() => {
                                    if (userRole === 'admin') {
                                        console.log('hi');
                                        handleReject?.();
                                    } else {
                                        handleDelete?.();
                                    }
                                    setIsSwiped(false);
                                }}
                            >
                                {userRole === 'admin' ? (
                                    <ClearIcon sx={{ color: 'white' }} />
                                ) : (
                                    <DeleteIcon sx={{ color: 'white' }} />
                                )}
                            </IconButton>
                        </Box>
                    </Box>
                )}
                <Card
                    className="request-card"
                    sx={{
                        flex: 1,
                        transform: isSwiped
                            ? 'translateX(-30%)'
                            : 'translateX(0)',
                        transition: 'transform 0.3s ease',
                    }}
                >
                    <CardContent
                        sx={{
                            backgroundColor: '#E7E0EC',
                        }}
                    >
                        <Grid2 container spacing={4}>
                            <Grid2 size="auto">
                                <img
                                    src={booking.equipment?.icon}
                                    style={IconStyle}
                                    alt={booking.equipment?.icon}
                                ></img>
                            </Grid2>
                            <Grid2 size="grow">
                                <Typography
                                    variant="h6"
                                    className="request-card-title"
                                    style={{
                                        marginBottom: '8px',
                                    }}
                                >
                                    {booking.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    className="request-card-description"
                                    style={{
                                        marginBottom: '8px',
                                        color: '#616161',
                                    }}
                                >
                                    {booking.description}
                                </Typography>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                    mt={1}
                                >
                                    <Typography
                                        variant="body2"
                                        className="request-card-date"
                                        style={{
                                            color: 'gray',
                                        }}
                                    >
                                        <EventIcon
                                            className="booking.equipment?.icon"
                                            style={{
                                                verticalAlign: 'middle',
                                            }}
                                        />
                                        {booking.bookingDate}
                                    </Typography>
                                </Box>
                            </Grid2>
                        </Grid2>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
};

export default MobileRequestCard;
