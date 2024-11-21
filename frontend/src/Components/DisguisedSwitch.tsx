import React, {useState} from 'react'
import Button from '@mui/material/Button';
import { createTheme, SxProps, Theme } from '@mui/material/styles';
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
interface DisguisedButtonProps
{
    showSwitchIfTrue: boolean,
    buttonDisabled: boolean,
    switchLabel: string,
    buttonLabel: string,
    switchToggled: boolean,
    formChecked?: boolean,
    switchLabelPlacement?: 'top' | 'bottom' | 'end' | 'start',
    formControlSX?: SxProps<Theme>,
    switchSX?: SxProps<Theme>,
    buttonSX?: SxProps<Theme>,
    onSwitch: ()=>void,
    onButtonPress: ()=>void,
}
const theme = createTheme();
const DisguisedButton = ({showSwitchIfTrue, buttonDisabled, switchLabel, buttonLabel, switchToggled, formChecked, switchLabelPlacement, formControlSX, switchSX, buttonSX, onSwitch, onButtonPress}: DisguisedButtonProps) =>
{
    if(showSwitchIfTrue)
    {
        return(
            <FormControlLabel checked={formChecked} labelPlacement={switchLabelPlacement} sx={formControlSX} control={<Switch sx={switchSX} color='secondary' checked={switchToggled} onChange={onSwitch}></Switch>} label={switchLabel}></FormControlLabel>
        );
    }
    else
    {
        return <Button variant="contained" sx={buttonSX} onClick={onButtonPress} disabled={buttonDisabled}>{buttonLabel}</Button> 
    }

}
export default DisguisedButton
