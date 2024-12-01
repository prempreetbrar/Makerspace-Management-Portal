import React from 'react'
import StarsIcon from '@mui/icons-material/Stars'
const PremiumBadge = ()=>
(
    <StarsIcon sx={ {
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '30px',
        color: '#e3c011',
        borderRadius: '30px',
    }}/>
);
export default PremiumBadge
