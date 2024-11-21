import '../styles/profile/local.css';
import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import { Box, TextField, Typography, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';

const textFieldSX = {
  backgroundColor: "#fff",
  "& .MuiFilledInput-root": {
    backgroundColor: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
    "& fieldset": { borderColor: "#4f378a" },
    "&:hover fieldset": { borderColor: "#4f378a" },
    "&.Mui-focused fieldset": { borderColor: "#4f378a" },
  },
  "& .Mui-disabled": {
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 0.6)",
  },
};

const sampleUser = {
  email: "real_email1@email.com",
  firstName: "Conner",
  lastName: "McDavid",
  password: "secret_pass123",
};

const Profile = () => {
  const [userDetails, setUserDetails] = useState(sampleUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [field]: event.target.value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add logic to save changes
    console.log("Saved details:", userDetails);
  };

  return (
    <>
      <NavBar id="profile" />
      <Box
        sx={{
          mt: { xs: "120px", md: "91px" },
          px: 3,
          py: 4,
          maxWidth: { xs: "90%", md: "600px" },
          margin: "0 auto",
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#eaddff",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#4f378a", fontWeight: "bold" }}
        >
          Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Email"
              fullWidth
              value={userDetails.email}
              onChange={handleChange("email")}
              disabled={!isEditing}
              variant={isEditing ? "outlined" : "filled"}
              sx={textFieldSX}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="First Name"
              fullWidth
              value={userDetails.firstName}
              onChange={handleChange("firstName")}
              disabled={!isEditing}
              variant={isEditing ? "outlined" : "filled"}
              sx={textFieldSX}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Last Name"
              fullWidth
              value={userDetails.lastName}
              onChange={handleChange("lastName")}
              disabled={!isEditing}
              variant={isEditing ? "outlined" : "filled"}
              sx={textFieldSX}
            />
          </Grid>
          {isEditing && (
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Password"
                fullWidth
                type="password"
                placeholder="Enter new password"
                onChange={handleChange("password")}
                variant="outlined"
                sx={textFieldSX}
              />
            </Grid>
          )}
        </Grid>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4f378a",
                  "&:hover": { backgroundColor: "#372862" },
                }}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "#4f378a",
                  borderColor: "#4f378a",
                  "&:hover": { borderColor: "#372862", color: "#372862" },
                }}
                onClick={handleEditToggle}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4f378a",
                "&:hover": { backgroundColor: "#372862" },
              }}
              onClick={handleEditToggle}
            >
              Edit Profile
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Profile;
