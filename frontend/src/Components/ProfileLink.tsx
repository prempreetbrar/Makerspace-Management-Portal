import React, { useState, useContext } from 'react';
import { Box, Button, Popover, Typography, IconButton } from '@mui/material';
import { AuthContext, UserRoles } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import theme from '../theme';
import star from '../assets/stars.svg';
import axiosInstance from '../axios';
import { useSearchParams } from 'react-router-dom';

const ProfileLink = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const { user, logout, refetch } = useContext(AuthContext)!;
    const iconButtonRef = React.useRef<HTMLButtonElement | null>(null);
    const [searchParams] = useSearchParams();

    React.useEffect(() => {
        if (searchParams.get('checkout') === 'success') {
            refetch();
            setAnchorEl(iconButtonRef.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

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

    const handleBuyPremium = async () => {
        try {
            const response = await axiosInstance.get('/users/checkout'); // API endpoint for checkout
            const checkoutUrl = response.data.session.url;

            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            } else {
                alert('Failed to get checkout URL. Please try again later.');
            }
        } catch (error) {
            console.error('Error fetching Stripe checkout URL:', error);
            alert('An error occurred. Please try again later.');
        }
    };
    const handlePostCheckout = async () => {
        try {
            const { isSuccess, message } = await refetch(); // Refetch the user data after checkout
            if (isSuccess) {
                console.log('User updated:', message);
            } else {
                console.error('Failed to update user:', message);
            }
        } catch (error) {
            console.error('Error refetching user data:', error);
        }
    };

    const open = Boolean(anchorEl);

    return (
        <>
            {/* User Icon */}
            <IconButton
                ref={iconButtonRef}
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
                        sx={{
                            fontFamily: theme.typography.fontFamily,
                        }}
                    >
                        {user?.firstName} {user?.lastName}
                    </Typography>

                    {/* Profile Link */}
                    <Button
                        component={Link}
                        to="/profile"
                        sx={{
                            backgroundColor: 'transparent',
                            color: theme.palette.text.primary,
                            textTransform: 'none',
                            padding: '0',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            fontFamily: theme.typography.fontFamily,
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        Profile
                    </Button>

                    {/* Buy Premium or Premium Badge */}
                    {user?.userRole === UserRoles.BASIC && (
                        <Button
                            variant="contained"
                            onClick={async () => {
                                await handleBuyPremium();
                                handlePostCheckout(); // refetch user data after checkout
                            }}
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
                                backgroundColor: theme.palette.primary.main,
                                color: 'white !important',
                                padding: '12px 20px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                textTransform: 'none',
                                cursor: 'default',
                                fontWeight: 'bold',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
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
