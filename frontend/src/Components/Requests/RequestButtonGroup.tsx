import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

interface ButtonGroupProps {
    value: string;
    onChange: (value: string) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ value, onChange }) => {
    return (
        <div
            className="button-group-container"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                marginBottom: '20px',
            }}
        >
            <ToggleButtonGroup
                value={value}
                exclusive
                onChange={(_event, newValue) => onChange(newValue)}
                className="button-group"
                style={{
                    display: 'flex',
                    paddingTop: '20px',
                    width: '80%',
                }}
            >
                <ToggleButton
                    value="approved"
                    className="toggle-button"
                    style={{
                        flex: 1,
                        textTransform: 'none',
                        padding: '8px 16px',
                        borderRadius: '0px',
                        ...(value === 'approved' && {
                            backgroundColor: '#65558F',
                            color: 'white',
                        }),
                        borderTopLeftRadius: '30px',
                        borderBottomLeftRadius: '30px',
                    }}
                >
                    Approved
                </ToggleButton>
                <ToggleButton
                    value="pending"
                    className="toggle-button"
                    style={{
                        flex: 1,
                        textTransform: 'none',
                        padding: '8px 16px',
                        borderRadius: '0px',
                        ...(value === 'pending' && {
                            backgroundColor: '#65558F',
                            color: 'white',
                        }),
                    }}
                >
                    Pending
                </ToggleButton>
                <ToggleButton
                    value="rejected"
                    className="toggle-button"
                    style={{
                        flex: 1,
                        textTransform: 'none',
                        padding: '8px 16px',
                        borderRadius: '0px',
                        ...(value === 'rejected' && {
                            backgroundColor: '#65558F',
                            color: 'white',
                        }),
                        borderTopRightRadius: '30px',
                        borderBottomRightRadius: '30px',
                    }}
                >
                    Rejected
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

export default ButtonGroup;
