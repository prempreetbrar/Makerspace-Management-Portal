import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import EventIcon from '@mui/icons-material/Event';

interface RequestCardProps {
  status: 'approved' | 'pending' | 'rejected';
  title: string;
  description: string;
  date: string;
  file: string;
}

const RequestCard: React.FC<RequestCardProps> = ({
  status,
  title,
  description,
  date,
  file,
}) => {
  return (
    <Card
      className="request-card"
      sx={{
        backgroundColor: 'white',
        margin: '10px 40px 10px 40px',
        padding: '10px',
        borderRadius: '14px',
        width: '80%',
      }}
    >
      <CardContent>
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
            justifyContent: 'space-between',
            marginTop: '10px',
          }}
        >
          <Typography variant="body2" className="card-date">
            <EventIcon
              className="icon"
              sx={{
                verticalAlign: 'middle',
              }}
            />{' '}
            {date}
          </Typography>
          <a href={`/${file}`} download className="card-file">
            <DownloadIcon className="icon" /> {file}
          </a>
          <IconButton className="card-delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RequestCard;
