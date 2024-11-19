import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../../styles/requests/MobileRequestCard.css';
import EventIcon from '@mui/icons-material/Event';

interface RequestCardProps {
  status: 'approved' | 'pending' | 'rejected';
  title: string;
  description: string;
  date: string;
}

const RequestCard: React.FC<RequestCardProps> = ({
  status,
  title,
  description,
  date,
}) => {
  const [isSwiped, setIsSwiped] = useState(false);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setIsSwiped(true), // Show action buttons when swiped left
    onSwipedRight: () => setIsSwiped(false), // Hide action buttons when swiped right
    preventScrollOnSwipe: true,
  });

  return (
    <div className="mobile-card-container">
      <Box
        {...swipeHandlers}
        sx={{
          position: 'relative',
          display: 'flex',
          width: '80%',
          backgroundColor: '#E7E0EC',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {/* Action Buttons */}
        {isSwiped && (
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '30%',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            {status === 'pending' && (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#E8B931',
                    borderRadius: 0,
                    width: '50%',
                    height: '100%',
                  }}
                >
                  <IconButton>
                    <EditIcon sx={{ color: '#FFF1C2' }} />
                  </IconButton>
                </Box>
              </>
            )}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#B3261E',
                borderRadius: 0,
                width: status === 'pending' ? '50%' : '100%',
                height: '100%',
              }}
            >
              <IconButton>
                <DeleteIcon sx={{ color: 'white' }} />
              </IconButton>
            </Box>
          </Box>
        )}

        {/* Main Card */}
        <Card
          sx={{
            flex: 1,
            transform: isSwiped ? 'translateX(-30%)' : 'translateX(0)',
            transition: 'transform 0.3s ease',
          }}
          className="mobile-request-card"
        >
          <CardContent>
            <Typography variant="h6" className="mobile-request-card-title">
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="mobile-request-card-description"
            >
              {description}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Typography variant="body2" className="mobile-request-card-date">
                <EventIcon className="icon" />
                {date}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default RequestCard;
