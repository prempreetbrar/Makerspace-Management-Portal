import React from 'react';
import {
    Button,
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    Grid2,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Booking } from '../../models.ts';

interface RequestCardProps {
    booking: Booking;
    userRole: string | undefined;
    handleDelete?: () => void;
    handleReject?: () => void;
    handleAccept?: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({
    booking,
    handleDelete,
    handleReject,
    handleAccept,
    userRole,
}) => {
    const IconStyle: React.CSSProperties = {
        width: '100px',
        height: '100px',
    };

    return (
        <Card
            className="request-card"
            sx={{
                backgroundColor: 'white',
                margin: '10px 0px 10px 0px',
                padding: '0px',
                borderRadius: '14px',
                width: '90%',
                boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.3)',
            }}
        >
            <CardContent>
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
                            className="card-title"
                            sx={{
                                fontWeight: 'bolder',
                            }}
                        >
                            {booking.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            className="card-description"
                            sx={{
                                margin: '10px 0',
                                color: '#757575',
                            }}
                        >
                            {booking.description}
                            {booking.status === 'denied' && (
                                <>
                                    <br />
                                    <br /> <strong>Admin Comment</strong>:{' '}
                                    {booking.adminComments}
                                </>
                            )}
                        </Typography>
                        <Box
                            className="card-footer"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '10px',
                            }}
                        >
                            <Typography
                                variant="body2"
                                className="card-date"
                                sx={{
                                    color: '#757575',
                                }}
                            >
                                <EventIcon
                                    className="booking.equipment?.icon"
                                    sx={{
                                        verticalAlign: 'middle',
                                        color: '#757575',
                                    }}
                                />{' '}
                                {booking.bookingDate}, {booking.timeSlot1}
                            </Typography>
                            {userRole === 'admin' && (
                                <Typography
                                    variant="body2"
                                    className="card-date"
                                    sx={{
                                        color: '#757575',
                                        marginLeft: 4,
                                    }}
                                >
                                    <AccountCircleIcon
                                        className="booking.equipment?.icon"
                                        sx={{
                                            verticalAlign: 'middle',
                                            color: '#757575',
                                        }}
                                    />{' '}
                                    {booking.userEmail}
                                </Typography>
                            )}
                        </Box>
                    </Grid2>
                    <Grid2 size="auto">
                        {userRole !== 'admin' && (
                            <Box
                                className="booking.equipment?.icon-box"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <IconButton
                                    className="card-delete"
                                    onClick={() => handleDelete?.()}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        )}
                    </Grid2>
                </Grid2>

                {userRole === 'admin' && (
                    <Grid2 container spacing={2}>
                        <Grid2 size="grow"></Grid2>
                        <Grid2>
                            <Button
                                sx={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.7)',
                                    paddingLeft: '30px',
                                    paddingRight: '30px',
                                    fontWeight: 'bold',
                                }}
                                variant="contained"
                                onClick={() => handleReject?.()}
                            >
                                Reject
                            </Button>
                            <Button
                                sx={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.7)',
                                    marginLeft: '15px',
                                    paddingLeft: '30px',
                                    paddingRight: '30px',
                                    fontWeight: 'bold',
                                }}
                                variant="contained"
                                onClick={() => handleAccept?.()}
                            >
                                Approve
                            </Button>
                        </Grid2>
                    </Grid2>
                )}
            </CardContent>
        </Card>
    );
};

export default RequestCard;
