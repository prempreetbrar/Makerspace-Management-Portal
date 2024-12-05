import React from "react"
import { Fab, Typography } from "@mui/material"
import SyncIcon from '@mui/icons-material/SyncRounded'
interface UpdateButtonProps {
    spinning: boolean;
    onClick: () => void;
}

const UpdateButton = React.memo(({spinning, onClick }: UpdateButtonProps)=>(
        <Fab
            onClick={onClick}
            color="primary"
            variant="extended"
            sx={{ position: 'fixed', bottom: '3%', right: '5%'}}>
            <Typography fontWeight={500} pr={1}>  Update</Typography>
            <SyncIcon
                sx={{
                    color: 'white',
                    animation: spinning ? 'spin 1s linear infinite' : 'none',
                    transform: 'rotate(-90deg)',
                    '@keyframes spin': {
                        'from': { transform: 'rotate(-90deg)' },
                        'to': { transform: 'rotate(-450deg)' },
                    },
                }}
            />
        </Fab>
    ),(prev, next)=>prev.spinning === next.spinning);

export default UpdateButton