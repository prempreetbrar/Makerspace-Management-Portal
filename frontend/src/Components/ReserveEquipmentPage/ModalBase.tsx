import React from 'react'
import { Box, Modal } from '@mui/material'
import { BorderAll } from '@mui/icons-material'
import WindowDimensions from '../WindowDimensions'
interface ModalBaseProps
{
    open: boolean,
    onClose: ()=>void,
    children: React.ReactNode,
}

const ModalBase = ({open, onClose, children}:ModalBaseProps) =>
{
    const {width, height} = WindowDimensions();
    const ModalStyle = {
        overflow: 'hidden',
        overflowY: 'scroll',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: width, md: 900 },
        height: { xs: height, md: 600 },
        bgcolor: 'rgba(255, 255, 255, 0)',
        boxShadow: 80,
        p: { xs: 1, s: 2, md: 4 },
    };

    return(
    <Modal open={open} onClose={onClose} sx={{display: open ? undefined : 'none'}}>
        <Box sx={ModalStyle}>
            {children}
        </Box>
    </Modal>
    );
}
export default ModalBase