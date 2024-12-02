import React, { useState } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import { Check, Info } from '@mui/icons-material';

interface MobileIssueCardProps {
    title: string | undefined;
    description: string;
    date: string;
    icon: any;
    isResolved: boolean;
    status: number;
}

const MobileIssueCard: React.FC<MobileIssueCardProps> = ({
    title,
    description,
    date,
    icon,
    status,
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
                        {status === 1 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#14AE5C',
                                    width: '50%',
                                    height: '100%',
                                }}
                            >
                                <IconButton>
                                    <CheckIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </Box>
                        )}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor:
                                    status === 1 ? '#E8B931' : '#B3261E',
                                width: status === 1 ? '50%' : '100%',
                                height: '100%',
                            }}
                        >
                            <IconButton>
                                {status === 1 ? (
                                    <InfoIcon sx={{ color: 'white' }} />
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
                                    src={icon}
                                    style={IconStyle}
                                    alt={icon}
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
                                    {title}
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
                                    {description}
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
                                            className="icon"
                                            style={{
                                                verticalAlign: 'middle',
                                            }}
                                        />
                                        {date}
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

export default MobileIssueCard;
