import React from "react"
import { createTheme, styled } from "@mui/material";
import { Card, CardActions, CardContent, CardActionArea } from "@mui/material"
import { Button, ButtonGroup } from "@mui/material";

const theme = createTheme();
interface RequestCardProps {
    children?: React.ReactNode,
    userRole?: string,
}

const DangerousActionButton = styled(Button)({
    backgroundColor: theme.palette.error.main,
    color: theme.palette.primary.contrastText,
    flexGrow: 0,
});
const PositiveActionButton = styled(Button)({
    backgroundColor: theme.palette.success.main,
    color: theme.palette.primary.contrastText,
    flexGrow: 0,
});

const RequestCard = ({ children, userRole }: RequestCardProps) => (
    <Card
        sx={{
            border: '1px solid black',
            backgroundColor: 'white',
            width: '80vw',
            minHeight:
            {
                xs: '100px',
            },
            display: 'flex',
            borderRadius: '20px',
            flexDirection: 'column'
        }}>
        <CardContent sx={{ padding: '3px' }}>
            {children}
        </CardContent>
        <CardActions>
            {userRole === "Admin" ? (
                <>
                    <ButtonGroup variant="contained">
                        <PositiveActionButton>
                            Approve
                        </PositiveActionButton>
                        <DangerousActionButton>
                            Deny
                        </DangerousActionButton>
                    </ButtonGroup>
                </>
            ) : (
                <>
                </>
            )}
        </CardActions>
    </Card>
);
export default RequestCard