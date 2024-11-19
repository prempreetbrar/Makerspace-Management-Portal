import React from 'react';
import '../../styles/requests/RequestCard.css';
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
    <Card className="request-card">
      <CardContent>
        <Typography variant="h6" className="card-title">
          {title}
        </Typography>
        <Typography variant="body2" className="card-description">
          {description}
        </Typography>
        <Box className="card-footer">
          <Typography variant="body2" className="card-date">
            <EventIcon className="icon" /> {date}
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
