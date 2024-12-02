import React from 'react';
import {
    Button,
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
    status?: 'approved' | 'pending' | 'rejected' | string;
    title?: string;
    description?: string;
    date?: string;
    icon?: any;
    user?: string | undefined;
}

const RequestCard: React.FC<RequestCardProps> = ({
    status,
    title,
    description,
    date,
    icon,
    user,
}) => {
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
                                color: '#757575',
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
                                    color: '#757575',
                                }}
                            >
                                <EventIcon
                                    className="icon"
                                    sx={{
                                        verticalAlign: 'middle',
                                        color: '#757575',
                                    }}
                                />{' '}
                                {date}
                            </Typography>
                        </Box>
                    </Grid2>
                    <Grid2 size="auto">
                        {user !== 'admin' && (
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
                        )}
                    </Grid2>
                </Grid2>

                {user === 'admin' && (
                    <Grid2 container spacing={2}>
                        <Grid2 size="grow"></Grid2>
                        <Grid2>
                            <Button
                                sx={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.7)',
                                    paddingLeft: '30px',
                                    paddingRight: '30px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Reject
                            </Button>
                            <Button
                                sx={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.7)',
                                    marginLeft: '15px',
                                    paddingLeft: '30px',
                                    paddingRight: '30px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Approve
                            </Button>
                        </Grid2>
                    </Grid2>
                )}
            </CardContent>
        </Card>
    );
};

export default RequestCard;
