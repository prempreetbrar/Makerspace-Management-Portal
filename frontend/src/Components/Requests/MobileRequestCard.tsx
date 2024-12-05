import React, { useEffect, useRef, useState } from 'react';
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

    const typographyRef = useRef<HTMLDivElement | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showExpandButton, setShowExpandButton] = useState(false);

    useEffect(() => {
        if (typographyRef.current) {
            const element = typographyRef.current;

            // Temporarily remove clamping by resetting the class
            element.classList.remove('collapsed');
            const computedStyle = getComputedStyle(element);
            const lineHeight = parseFloat(computedStyle.lineHeight);
            const height = element.scrollHeight;
            const lines = Math.round(height / lineHeight);

            // Reapply clamping if not expanded
            if (!isExpanded) {
                element.classList.add('collapsed');
            }

            // Show "Show More" button only if lines exceed 2
            setShowExpandButton(lines > 2);
        }
    }, [isExpanded]);

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
                                    ref={typographyRef}
                                    variant="body2"
                                    color="text.secondary"
                                    className="request-card-description"
                                    style={{
                                        color: '#616161',
                                    }}
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        WebkitLineClamp: isExpanded
                                            ? 'unset'
                                            : 2,
                                    }}
                                >
                                    {booking.description}
                                    {booking.status === 'denied' && (
                                        <>
                                            <br />
                                            <br />{' '}
                                            <strong>Admin Comment</strong>:{' '}
                                            {booking.adminComments}
                                        </>
                                    )}
                                    {showExpandButton && (
                                        <span
                                            style={{
                                                color: '#1976d2',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                marginLeft: 4,
                                            }}
                                            onClick={() =>
                                                setIsExpanded((prev) => !prev)
                                            }
                                        >
                                            Collapse
                                        </span>
                                    )}
                                </Typography>
                                {showExpandButton && (
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            display: 'inline-block',
                                            color: '#1976d2',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                        }}
                                        onClick={() =>
                                            setIsExpanded((prev) => !prev)
                                        }
                                    >
                                        {isExpanded ? '' : 'Show more'}
                                    </Typography>
                                )}

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
