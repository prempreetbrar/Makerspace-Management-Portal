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
import EventIcon from '@mui/icons-material/Event';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import { Issue } from '../../models.ts';

interface MobileIssueCardProps {
    issue: Issue;
    handleOOD?: () => void;
    handleResolve?: () => void;
}

const MobileIssueCard: React.FC<MobileIssueCardProps> = ({
    issue,
    handleOOD,
    handleResolve,
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
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#14AE5C',
                                width:
                                    issue.equipment?.isUnderMaintenance ===
                                    false
                                        ? '50%'
                                        : '100%',
                                height: '100%',
                            }}
                            onClick={() => {
                                handleResolve?.();
                                setIsSwiped(false);
                            }}
                        >
                            <IconButton
                                onClick={() => {
                                    handleResolve?.();
                                    setIsSwiped(false);
                                }}
                            >
                                <CheckIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Box>
                        {issue.equipment?.isUnderMaintenance === false && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#E8B931',
                                    width: '50%',
                                    height: '100%',
                                }}
                                onClick={() => {
                                    handleOOD?.();
                                    setIsSwiped(false);
                                }}
                            >
                                <IconButton
                                    onClick={() => {
                                        handleOOD?.();
                                        setIsSwiped(false);
                                    }}
                                >
                                    <InfoIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </Box>
                        )}
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
                                    src={issue.equipment?.icon}
                                    style={IconStyle}
                                    alt={issue.equipment?.icon}
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
                                    {issue.equipment?.name}
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
                                    {issue.description}
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
                                            className="issue.equipment?.icon"
                                            style={{
                                                verticalAlign: 'middle',
                                            }}
                                        />
                                        {issue.createdAt}
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
