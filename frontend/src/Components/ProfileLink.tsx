import React, { useState, useContext } from 'react';
import { Box, Button, Popover, Typography, IconButton } from '@mui/material';
import { AuthContext, UserRoles } from '../contexts/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import theme from '../theme';
import star from '../assets/stars.png';

const ProfileLink = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const { user, logout } = useContext(AuthContext)!;

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handlePopoverClose();
    };

    const open = Boolean(anchorEl);

    return (
        <>
            {/* User Icon */}
            <IconButton
                onClick={handlePopoverOpen}
                sx={{
                    backgroundColor: theme.palette.secondary.main,
                    width: 40,
                    height: 40,
                    '&:hover': {
                        backgroundColor: ['#b49dc4'],
                    },
                }}
            >
                <AccountCircleIcon
                    sx={{
                        color: theme.palette.primary.main,
                        fontSize: 30,
                    }}
                />
            </IconButton>

            {/* Popover */}
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                sx={{
                    '& .MuiPopover-paper': {
                        padding: '16px',
                        minWidth: '200px',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Elevated shadow
                        borderRadius: '10px',
                        backgroundColor: theme.palette.background.default,
                    },
                }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                >
                    {/* User's Name */}
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        color={theme.palette.text.primary}
                    >
                        {user?.firstName} {user?.lastName}
                    </Typography>

                    {/* Buy Premium or Premium Badge */}
                    {user?.userRole === UserRoles.BASIC && (
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: theme.palette.secondary.main,
                                color: 'white !important',
                                textTransform: 'none',
                                padding: '12px 20px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.main,
                                    color: 'white',
                                },
                            }}
                        >
                            <img
                                src={star}
                                alt="Premium Star"
                                style={{ width: '20px', height: '20px' }}
                            />
                            Buy Premium
                        </Button>
                    )}

                    {user?.userRole === UserRoles.PREMIUM && (
                        <Button
                            sx={{
                                backgroundColor: theme.palette.secondary.main,
                                color: 'white !important',
                                padding: '12px 20px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                textTransform: 'none',
                                cursor: 'default',
                                fontWeight: 'bold',
                            }}
                            disabled
                        >
                            <img
                                src={star}
                                alt="Premium Star"
                                style={{ width: '20px', height: '20px' }}
                            />
                            Premium
                        </Button>
                    )}

                    {/* Logout Button */}
                    <Button
                        onClick={handleLogout}
                        sx={{
                            color: theme.palette.error.main || '#FF0000',
                            textTransform: 'none',
                        }}
                    >
                        Log Out
                    </Button>
                </Box>
            </Popover>
        </>
    );
};

export default ProfileLink;
