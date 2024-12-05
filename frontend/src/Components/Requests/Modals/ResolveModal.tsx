import React from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    IconButton,
    useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Issue } from '../../../models';
import theme from '../../../theme';

interface ResolveIssueProps {
    open: boolean;
    data?: Issue | null;
    onClose: () => void;
    onConfirm: () => void;
}

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
    width: 500,
    [theme.breakpoints.down('md')]: {
        width: 300,
        padding: '24px',
        textAlign: 'center',
        top: '40%',
    },
};

const titleStyle = {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '8px',
    [theme.breakpoints.down('md')]: {
        fontSize: '18px',
    },
};

const descriptionStyle = {
    fontSize: '14px',
    color: '#757575',
    marginBottom: '16px',
    [theme.breakpoints.down('md')]: {
        fontSize: '12px',
    },
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
};

const buttonStyles = {
    close: {
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid #ddd',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
        textTransform: 'none',
        fontWeight: 500,
        borderRadius: 2,
        padding: '8px 16px',
        width: 100,
        '&:hover': {
            backgroundColor: '#f1f1f1',
        },
    },
    continue: {
        backgroundColor: 'black',
        color: '#FFFFFF',
        textTransform: 'none',
        fontWeight: 500,
        borderRadius: 2,
        padding: '8px 16px',
        width: 150,
        '&:hover': {
            backgroundColor: '#333',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '14px',
            marginInline: 'auto',
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
            width: '90%',
        },
    },
};

const closeIconStyle = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    [theme.breakpoints.down('md')]: {
        top: '8px',
        right: '8px',
    },
};

const ResolveModal: React.FC<ResolveIssueProps> = ({
    open,
    onClose,
    data,
    onConfirm,
}) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                {isMobile && (
                    <IconButton sx={closeIconStyle} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                )}
                <Typography variant="h6" sx={titleStyle}>
                    Resolve Issue
                </Typography>
                <Typography variant="body2" sx={descriptionStyle}>
                    Resolve the issue for {data?.equipment?.name}?
                </Typography>
                <Box sx={buttonContainerStyle}>
                    {!isMobile && (
                        <Button sx={buttonStyles.close} onClick={onClose}>
                            Close
                        </Button>
                    )}
                    <Button sx={buttonStyles.continue} onClick={onConfirm}>
                        Confirm
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ResolveModal;
