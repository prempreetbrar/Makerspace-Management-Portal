import NavBar from '../Components/NavBar';
import React, { useState } from 'react';
import '../styles/requests/local.css';
import TabContainer from '../Components/Requests/TabContainer';
import RequestCard from '../Components/Requests/RequestCard';
import MobileRequestCard from '../Components/Requests/MobileRequestCard';
import { useMediaQuery } from '@mui/material';
import { validateDate } from '@mui/x-date-pickers';

import ThreeDPrinterIcon from '../assets/3D_printer.svg';
import LaserCutterIcon from '../assets/laser_cutter.svg';
import CNCMillIcon from '../assets/laser_cutter.svg';
import MakerbotReplicatorImg from '../assets/mb_replicator.jpeg';

interface CardInfo {
    key: number;
    tite: string;
    description: string;
    date: string;
    file?: string;
    icon: string;
}

const Requests = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [status, setStatus] = useState(0);

    const requests = [
        {
            id: 1,
            status: 'approved',
            title: '3D Printer',
            description:
                'I plan on using this printer to print out a prototype.',
            date: 'Sep 5, 10:00-11:00AM',
            file: 'vinylfile.svg',
            icon: ThreeDPrinterIcon,
        },
        {
            id: 2,
            status: 'pending',
            title: 'Laser Cutter',
            description: 'I plan on using this machine to cut out a model.',
            date: 'Sep 10, 10:00-11:00AM',
            file: 'vinylfile.svg',
            icon: LaserCutterIcon,
        },
        {
            id: 3,
            status: 'pending',
            title: 'Laser Cutter',
            description: 'I plan on using this machine to cut out a model.',
            date: 'Sep 10, 10:00-11:00AM',
            file: 'vinylfile.svg',
            icon: LaserCutterIcon,
        },
        {
            id: 4,
            status: 'rejected',
            title: 'Maker Bot Replicator',
            description: 'make a bomb',
            date: 'Sep 10, 10:00-11:00AM',
            file: 'vinylfile.svg',
            icon: MakerbotReplicatorImg,
        },
    ];

    const numberToStringMap: { [key: number]: string } = {
        0: 'approved',
        1: 'pending',
        2: 'rejected',
    };

    return (
        <div className="requestContainer">
            <NavBar id="request"></NavBar>
            <TabContainer value={status} onChange={setStatus}>
                {requests
                    .filter(
                        (request) =>
                            request.status === numberToStringMap[Number(status)]
                    )
                    .map((request) =>
                        isMobile ? (
                            <MobileRequestCard
                                key={request.id}
                                status={request.status}
                                title={request.title}
                                description={request.description}
                                date={request.date}
                                icon={request.icon}
                            />
                        ) : (
                            <RequestCard
                                key={request.id}
                                status={request.status}
                                title={request.title}
                                description={request.description}
                                date={request.date}
                                file={request.file}
                                icon={request.icon}
                            />
                        )
                    )}
            </TabContainer>
        </div>
    );
};

export default Requests;
