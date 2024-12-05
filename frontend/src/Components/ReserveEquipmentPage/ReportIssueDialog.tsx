import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IssueConfirmationDialog from './IssueConfirmationDialog'; // Import the new confirmation dialog

interface ReportIssueDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (issueDescription: string) => void;
}

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#65558F",
        },
        secondary: {
            main: "#ECE6F0",
        },
        text: {
            primary: "#000000",
            secondary: "#5F5F5F",
        },
        background: {
            default: "#FFFFFF",
        },
    },
    typography: {
        fontFamily: "Arial, sans-serif",
    },
});

const ReportIssueDialog: React.FC<ReportIssueDialogProps> = ({ open, onClose, onSubmit }) => {
    const [issueDescription, setIssueDescription] = useState("");
    const [isConfirmationOpen, setConfirmationOpen] = useState(false); 

    const handleSubmit = () => {
        setConfirmationOpen(true); 
        onClose(); 
    };

    const handleConfirm = () => {
        onSubmit(issueDescription); 
        setIssueDescription(""); 
        setConfirmationOpen(false); 
    };

    const handleCancel = () => {
        setConfirmationOpen(false);
    };

    return (
        <ThemeProvider theme={customTheme}>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>Report Issue</DialogTitle>
                <DialogContent>
                    <TextField sx={{backgroundColor:'#E5E5EA'}}
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        placeholder="Please leave a comment to explain the issue with the equipment"
                        value={issueDescription}
                        onChange={(e) => setIssueDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        paddingBottom: '20px',
                        width: '100%',
                    }}>
                        <Button onClick={onClose}
                            sx={{
                                backgroundColor: 'white',
                                color: 'black',
                                textTransform: 'none',
                                borderRadius: 2,
                                boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.7)',
                                paddingLeft: '30px',
                                paddingRight: '30px',
                            }}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}
                            sx={{
                                backgroundColor: '#65558F',
                                color: 'white',
                                textTransform: 'none',
                                borderRadius: 2,
                                boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.7)',
                                marginLeft: '15px',
                                paddingLeft: '30px',
                                paddingRight: '30px',
                                fontWeight: 'bold',
                            }} variant="contained" disabled={!issueDescription}>
                            Submit
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>

            <IssueConfirmationDialog
                open={isConfirmationOpen}
                onClose={handleConfirm} 
            />
        </ThemeProvider>
    );
};

export default ReportIssueDialog;
