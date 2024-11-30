import NavBar from '../Components/NavBar';
import React, { useState } from 'react';
import '../styles/requests/local.css';
import TabContainer from '../Components/Requests/TabContainer';
import RequestCard from '../Components/Requests/RequestCard';
import MobileRequestCard from '../Components/Requests/MobileRequestCard';
import MobileIssueCard from '../Components/Requests/MobileIssueCard';
import IssueCard from '../Components/Requests/IssueCard';
import { Box, Button, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ThreeDPrinterIcon from '../assets/3D_printer.svg';
import LaserCutterIcon from '../assets/laser_cutter.svg';
import CNCMillIcon from '../assets/laser_cutter.svg';

interface RequestCardInfo {
    key: number;
    title: string;
    description: string;
    date: string;
    file: string;
    icon: string;
    status: string;
}

interface IssueCardInfo {
    key: number;
    title: string;
    description: string;
    date: string;
    icon: string;
    isResolved: boolean;
}

const Requests = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [status, setStatus] = useState(0);

    type UserState = 'basic' | 'premium' | 'admin' | string;
    const [userState, setUserState] = useState<UserState>('basic');

    const userStates: UserState[] = ['basic', 'premium', 'admin'];

    const handleChangeUser = () => {
        const currentIndex = userStates.indexOf(userState);
        const nextIndex = (currentIndex + 1) % userStates.length;
        setUserState(userStates[nextIndex]);
    };

    const ChangeUserButton = () => (
        <Button
            id="debugButton"
            sx={{ width: '250px', position: 'sticky', bottom: 2, zIndex: 1000 }}
            variant="contained"
            onClick={handleChangeUser}
        >
            Change User: {userState}
        </Button>
    );

    const numberToStringMap: { [key: number]: string } = {
        0: 'approved',
        1: 'pending',
        2: 'rejected',
    };

    const requests: RequestCardInfo[] = [
        {
            key: 1,
            status: 'approved',
            title: '3D Printer',
            description:
                'I plan on using this printer to print out a prototype.',
            date: 'Sep 5, 10:00-11:00AM',
            file: 'vinylfile.svg',
            icon: ThreeDPrinterIcon,
        },
        {
            key: 2,
            status: 'pending',
            title: 'Laser Cutter',
            description: 'I plan on using this machine to cut out a model.',
            date: 'Sep 10, 10:00-11:00AM',
            file: 'vinylfile.svg',
            icon: LaserCutterIcon,
        },
        {
            key: 3,
            status: 'pending',
            title: 'Laser Cutter',
            description: 'I plan on using this machine to cut out a model.',
            date: 'Sep 10, 10:00-11:00AM',
            file: 'vinylfile.svg',
            icon: LaserCutterIcon,
        },
        {
            key: 4,
            status: 'rejected',
            title: 'Maker Bot Replicator',
            description: 'I plan on using this machine to create a model.',
            date: 'Sep 10, 10:00-11:00AM',
            file: 'vinylfile.svg',
            icon: ThreeDPrinterIcon,
        },
    ];
    const theme = createTheme({
        palette: {
            primary: {
                main: '#65558F',
            },
            secondary: {
                main: '#ECE6F0',
            },
            text: {
                primary: '#000000',
                secondary: '#5F5F5F',
            },
            background: {
                default: '#FFFFFF',
            },
        },
        typography: {
            fontFamily: 'Roboto, sans-serif',
        },
    });
    

    const issues: IssueCardInfo[] = [
        {
            key: 1,
            isResolved: false,
            title: '3D Printer',
            description: 'Broken asdf',
            date: 'Sep 5, 10:00-11:00AM',
            icon: ThreeDPrinterIcon,
        },
        {
            key: 2,
            isResolved: true,
            title: '3D Printer',
            description: 'Broken asdf',
            date: 'Sep 5, 10:00-11:00AM',
            icon: ThreeDPrinterIcon,
        },
        {
            key: 3,
            isResolved: false,
            title: '3D Printer',
            description: 'Broken asdf',
            date: 'Sep 5, 10:00-11:00AM',
            icon: ThreeDPrinterIcon,
        },
        {
            key: 4,
            isResolved: true,
            title: '3D Printer',
            description: 'Broken asdf',
            date: 'Sep 5, 10:00-11:00AM',
            icon: ThreeDPrinterIcon,
        },
    ];

    return (
        <div className="requestContainer">
            <ThemeProvider theme={theme}>
            <NavBar id="request" />
            <Box sx={{paddingTop: 3, paddingLeft:3,
                                justifyContent: 'center',
                                width: '100%'
                                }}>
            <ChangeUserButton />

            </Box>
            <TabContainer value={status} onChange={setStatus} user={userState}>
                {userState === 'admin'
                    ? status === 0
                        ? // Admin view: Show pending requests
                          requests
                              .filter((request) => request.status === 'pending')
                              .map((request) =>
                                  isMobile ? (
                                      <MobileRequestCard
                                          key={request.key}
                                          status={request.status}
                                          title={request.title}
                                          description={request.description}
                                          date={request.date}
                                          file={request.file}
                                          icon={request.icon}
                                          user={userState}
                                      />
                                  ) : (
                                      <RequestCard
                                          key={request.key}
                                          status={request.status}
                                          title={request.title}
                                          description={request.description}
                                          date={request.date}
                                          file={request.file}
                                          icon={request.icon}
                                          user={userState}
                                      />
                                  )
                              )
                        : status === 1
                          ? // Admin view: Show issues when status is 1
                            issues
                                .filter((issue) => issue.isResolved == false)
                                .map((issue) =>
                                    isMobile ? (
                                        <MobileIssueCard
                                            key={issue.key}
                                            isResolved={issue.isResolved}
                                            title={issue.title}
                                            description={issue.description}
                                            date={issue.date}
                                            icon={issue.icon}
                                            status={status}
                                        />
                                    ) : (
                                        <IssueCard
                                            key={issue.key}
                                            isResolved={issue.isResolved}
                                            title={issue.title}
                                            description={issue.description}
                                            date={issue.date}
                                            icon={issue.icon}
                                            status={status}
                                        />
                                    )
                                )
                          : // Admin view: Default case
                            issues
                                .filter((issue) => issue.isResolved == true)
                                .map((issue) =>
                                    isMobile ? (
                                        <MobileIssueCard
                                            key={issue.key}
                                            isResolved={issue.isResolved}
                                            title={issue.title}
                                            description={issue.description}
                                            date={issue.date}
                                            icon={issue.icon}
                                            status={status}
                                        />
                                    ) : (
                                        <IssueCard
                                            key={issue.key}
                                            isResolved={issue.isResolved}
                                            title={issue.title}
                                            description={issue.description}
                                            date={issue.date}
                                            icon={issue.icon}
                                            status={status}
                                        />
                                    )
                                )
                    : // General user view: Filter requests based on status
                      requests
                          .filter(
                              (request) =>
                                  request.status === numberToStringMap[status]
                          )
                          .map((request) =>
                              isMobile ? (
                                  <MobileRequestCard
                                      key={request.key}
                                      status={request.status}
                                      title={request.title}
                                      description={request.description}
                                      date={request.date}
                                      file={request.file}
                                      icon={request.icon}
                                      user={userState}
                                  />
                              ) : (
                                  <RequestCard
                                      key={request.key}
                                      status={request.status}
                                      title={request.title}
                                      description={request.description}
                                      date={request.date}
                                      file={request.file}
                                      icon={request.icon}
                                      user={userState}
                                  />
                              )
                          )}
            </TabContainer>
            </ThemeProvider>
        </div>
    );
};

export default Requests;
