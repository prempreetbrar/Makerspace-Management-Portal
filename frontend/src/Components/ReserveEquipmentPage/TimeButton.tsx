import React from 'react';
import Button from '@mui/material/Button'

interface TimeButtonProps
{
    disabled?: boolean,
    selected: boolean,
    displayedTime: string,
    internalTime: string,
    onClick: (time: string)=>void,
}

const TimeButton = React.memo(({...buttonProps}:TimeButtonProps)=>
{
    const handleSelect = React.useCallback((_e: React.MouseEvent)=>
    {
        buttonProps.onClick(buttonProps.internalTime);

    },[buttonProps.onClick]);

    return(
        <Button variant={buttonProps.selected ? 'contained' : 'outlined'} 
            sx={{ width: 100, margin: '2px', fontSize: 11 }} onClick={handleSelect}
            disabled = {buttonProps.disabled}>{buttonProps.displayedTime}
        </Button>
    );
},(prev, next)=>(prev.disabled === next.disabled && prev.selected === next.selected));

export default TimeButton