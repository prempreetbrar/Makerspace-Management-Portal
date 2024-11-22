import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    Grid2,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';

interface RequestCardProps {
    status: 'approved' | 'pending' | 'rejected' | string;
    title: string;
    description: string;
    date: string;
    file: string;
    icon: any;
}

const RequestCard = ({ status, title, description, date, file, icon }) => {
    const IconStyle: React.CSSProperties = {
        width: '100px',
        height: '100px',
    };

    return (
        <Card
            className="request-card"
            sx={{
                backgroundColor: 'white',
                margin: '10px 0px 10px 0px',
                padding: '0px',
                borderRadius: '14px',
                width: '90%',
                boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.3)',
            }}
        >
            <CardContent>
                <Grid2 container spacing={4}>
                    <Grid2 size="auto">
                        <img src={icon} style={IconStyle} alt={icon}></img>
                    </Grid2>
                    <Grid2 size="grow">
                        <Typography
                            variant="h6"
                            className="card-title"
                            sx={{
                                fontWeight: 'bolder',
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="body2"
                            className="card-description"
                            sx={{
                                margin: '10px 0',
                            }}
                        >
                            {description}
                        </Typography>
                        <Box
                            className="card-footer"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '10px',
                            }}
                        >
                            <Typography
                                variant="body2"
                                className="card-date"
                                sx={{
                                    flex: '1',
                                }}
                            >
                                <EventIcon
                                    className="icon"
                                    sx={{
                                        verticalAlign: 'middle',
                                    }}
                                />{' '}
                                {date}
                            </Typography>
                            <Box
                                className="download-link"
                                sx={{
                                    flex: '1',
                                }}
                            >
                                <a
                                    href={`/${file}`}
                                    download
                                    className="card-file"
                                >
                                    <DownloadIcon className="icon" /> {file}
                                </a>
                            </Box>
                        </Box>
                    </Grid2>
                    <Grid2 size="auto">
                        <Box
                            className="icon-box"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <IconButton className="card-delete">
                                <DeleteIcon />
                            </IconButton>
                            {status === 'pending' && (
                                <IconButton className="card-edit">
                                    <EditIcon />
                                </IconButton>
                            )}
                        </Box>
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>
    );
};

export default RequestCard;
