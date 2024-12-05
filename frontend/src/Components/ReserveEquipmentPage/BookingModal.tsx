import React, { useState } from "react";
import { 
    Fab, Tab, Tabs, Stack, Typography, Button, Card, CardContent, CardActionArea, CardActions, Accordion, ButtonGroup, CircularProgress, Grid2, IconButton, TextField, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions 
} from "@mui/material";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { CancelRounded } from "@mui/icons-material";
import WindowDimensions from "../WindowDimensions";
import ReportIssueDialog from "./ReportIssueDialog";
import ConfirmationDialog from "./ConfirmationDialog";

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

const timeButtonStyle = { width: 100, margin: "2px", fontSize: 11 };

const timesArray = [
    { time: "8:00 AM", premiumOnly: true },
    { time: "9:00 AM", premiumOnly: true },
    { time: "10:00 AM", premiumOnly: false },
    { time: "11:00 AM", premiumOnly: false },
    { time: "12:00 PM", premiumOnly: false },
    { time: "1:00 PM", premiumOnly: false },
    { time: "2:00 PM", premiumOnly: false },
    { time: "3:00 PM", premiumOnly: false },
    { time: "4:00 PM", premiumOnly: false },
    { time: "5:00 PM", premiumOnly: false },
    { time: "6:00 PM", premiumOnly: false },
    { time: "7:00 PM", premiumOnly: true },
    { time: "8:00 PM", premiumOnly: true },
];

type TimeEntry = {
    time: string;
    premiumOnly: boolean;
};

type BookingCalendarProps = {
    userRole: string;
    onClose: () => void;
    onSubmit: () => void;
    externalProps?: any;
};
const BookingCalendar = ({ userRole, onClose, externalProps }: BookingCalendarProps) => {
    const { height, width } = WindowDimensions();
    const [inputText, setInputText] = useState("");
    const [selectedTimeButton, setSelectedTimeButton] = useState(-1);
    const [selectedTime, setSelectedTime] = useState("");
    const [reportDialogOpen, setReportDialogOpen] = useState(false);
 
    const [dialogOpen, setDialogOpen] = useState(false);

    const today = dayjs();
    const nMonthsFromNow = today.add(2, "month");

    const handleTimeSelect = (buttonIndex: number, listingTime: string) => {
        setSelectedTimeButton(buttonIndex);
        setSelectedTime(listingTime);
    };

    const handleTextUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };


    //issues
    const handleOpenReportDialog = () => {
        setReportDialogOpen(true);
    };

    const handleCloseReportDialog = () => {
        setReportDialogOpen(false);
    };

    const handleSubmitReport = (issueDescription: string) => {
        console.log("Reported Issue:", issueDescription);
        setReportDialogOpen(false);
    };



    const handleSubmitRequest = () => {
        console.log("Submission successful:", { inputText, selectedTime });
         //backend
        setInputText("");
        setSelectedTime("");
        setDialogOpen(true); 
    };

    const handleCloseModal = (submitted = false) => {
        if (submitted) {
        }
        setInputText("");
        setSelectedTime("");
        onClose();
    };

   
    const handleCloseDialog = (confirmed: boolean) => {
        setDialogOpen(false); 
        if (confirmed) {
          console.log("Submission confirmed");
          handleCloseModal(true); 
        } else {
          console.log("Submission canceled");
        }
      };

    return (
        <ThemeProvider theme={customTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                    sx={{
                        height: { xs: height },
                        overflowY: "scroll",
                        borderRadius: 5,
                        padding: 2,
                        backgroundColor: "white",
                        boxShadow: 3,
                    }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <IconButton
                        sx={{ marginLeft: "auto", color: "red" }}
                        size="small"
                        onClick={onClose}
                    >
                        <CancelRounded fontSize="large" />
                    </IconButton>
                    <Box
                        sx={{ overflowX: "hidden", overflowY: "scroll" }}
                        display="flex"
                        flexDirection="column"
                        alignContent="center"
                    >
                        <Typography variant="h4">Reserve a Time</Typography>
                        <Box
                            sx={{
                                alignSelf: "center",
                                flexDirection: { xs: "column", md: "row" },
                                margin: "10px",
                            }}
                            display="flex"
                        >
                            <Box mr={{ xs: 0, md: 5 }}>
                                <DateCalendar
                                    disablePast
                                    sx={{
                                        minWidth: 300,
                                        backgroundColor: "#ECE6F0",
                                        borderRadius: 4,
                                    }}
                                    defaultValue={today}
                                    minDate={today}
                                    maxDate={nMonthsFromNow}
                                />
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h6" sx={{ marginTop: 1 }}>
                                    Available Times:
                                </Typography>
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <Grid2 container rowSpacing={0.25} justifyContent="left">
                                        {timesArray.map((listing, index) => (
                                            <Button
                                                key={index}
                                                variant={
                                                    selectedTimeButton !== index
                                                        ? "outlined"
                                                        : "contained"
                                                }
                                                sx={timeButtonStyle}
                                                onClick={() =>
                                                    handleTimeSelect(index, listing.time)
                                                }
                                                disabled={
                                                    userRole !== "Premium" && listing.premiumOnly
                                                }
                                            >
                                                {listing.time}
                                            </Button>
                                        ))}
                                    </Grid2>
                                </Box>
                                <TextField
                                    label="Request Details"
                                    placeholder="Description"
                                    sx={{ marginTop: 3 }}
                                    multiline
                                    fullWidth
                                    required
                                    variant="filled"
                                    onChange={handleTextUpdate}
                                />
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    sx={{ marginTop: 3, width: "100%" }}
                                >
                                    <Button
                                        sx={{
                                            backgroundColor: "white",
                                            color: "black",
                                            textTransform: "none",
                                            borderRadius: 2,
                                            boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.7)",
                                            paddingLeft: "30px",
                                            paddingRight: "30px",
                                        }}
                                        onClick={handleOpenReportDialog}
                                    >
                                        Report Issue
                                    </Button>
                                    <Button
                                        sx={{
                                            backgroundColor: "#65558F",
                                            color: "white",
                                            textTransform: "none",
                                            borderRadius: 2,
                                            boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.7)",
                                            marginLeft: "15px",
                                            paddingLeft: "30px",
                                            paddingRight: "30px",
                                            fontWeight: "bold",
                                        }}
                                        disabled={!inputText || !selectedTime}
                                        onClick={handleSubmitRequest}
                                    >
                                        Submit Request
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* Use ConfirmationDialog */}
                    <ConfirmationDialog 
                        open={dialogOpen} 
                        onClose={handleCloseDialog}
                    />

                    {/* Report Issue Dialog */}
                    <ReportIssueDialog
                        open={reportDialogOpen}
                        onClose={handleCloseReportDialog}
                        onSubmit={handleSubmitReport}
                    />
                </Box>
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default BookingCalendar;
