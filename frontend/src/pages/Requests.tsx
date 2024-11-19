import NavBar from '../Components/NavBar';
import React, { useState } from 'react';
import '../styles/requests/local.css';
import TabContainer from '../Components/Requests/TabContainer';
import RequestCard from '../Components/Requests/RequestCard';
import MobileNavbar from '../Components/Requests/MobileNavBar';
import RequestButtonGroup from '../Components/Requests/RequestButtonGroup';
import MobileRequestCard from '../Components/Requests/MobileRequestCard';
import { useMediaQuery } from '@mui/material';

interface CardInfo {
  key: number;
  tite: string;
  description: string;
  date: string;
  file?: string;
}

const Requests = () => {
  const isMobile = useMediaQuery('(max-width:786px)');
  const [selectedTab, setSelectedTab] = useState('requests');
  const [status, setStatus] = useState('approved');

  const requests = [
    {
      id: 1,
      status: 'approved',
      title: '3D Printer',
      description: 'I plan on using this printer to print out a prototype.',
      date: 'Sep 5, 10:00-11:00AM',
      file: 'vinylfile.svg',
    },
    {
      id: 2,
      status: 'pending',
      title: 'Laser Cutter',
      description: 'I plan on using this machine to cut out a model.',
      date: 'Sep 10, 10:00-11:00AM',
      file: 'vinylfile.svg',
    },
    {
      id: 3,
      status: 'pending',
      title: 'Laser Cutter',
      description: 'I plan on using this machine to cut out a model.',
      date: 'Sep 10, 10:00-11:00AM',
      file: 'vinylfile.svg',
    },
  ];

  return (
    <div className="requestContainer">
      {isMobile ? (
        <>
          <MobileNavbar
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />
          <RequestButtonGroup value={status} onChange={setStatus} />
          <div className="request-list">
            {requests
              .filter((request) => request.status === status)
              .map((request) => (
                <MobileRequestCard
                  key={request.id}
                  status={request.status}
                  title={request.title}
                  description={request.description}
                  date={request.date}
                />
              ))}
          </div>
        </>
      ) : (
        <>
          <NavBar id="request"></NavBar>
          <TabContainer
            approvedCards={requests
              .filter((request) => request.status === 'approved')
              .map((request) => (
                <RequestCard
                  key={request.id}
                  status={request.status}
                  title={request.title}
                  description={request.description}
                  date={request.date}
                  file={request.file}
                />
              ))}
            pendingCards={requests
              .filter((request) => request.status === 'pending')
              .map((request) => (
                <RequestCard
                  key={request.id}
                  status={request.status}
                  title={request.title}
                  description={request.description}
                  date={request.date}
                  file={request.file}
                />
              ))}
            rejectedCards={requests
              .filter((request) => request.status === 'rejected')
              .map((request) => (
                <RequestCard
                  key={request.id}
                  status={request.status}
                  title={request.title}
                  description={request.description}
                  date={request.date}
                  file={request.file}
                />
              ))}
          />
        </>
      )}
    </div>
  );
};

export default Requests;
