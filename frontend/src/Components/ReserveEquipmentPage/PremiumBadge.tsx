import React from 'react'
import {motion} from 'framer-motion'
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
const PremiumBadge = ()=>
(
    <StarsRoundedIcon sx={ {
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '30px',
        color: '#e3c011',
        borderRadius: '30px',
    }}/>
);
export default PremiumBadge
