import { Box, Typography, styled } from '@mui/material';
import React from 'react'

const ErrorBox = styled(Box)({
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });
  
export const ErrorMessage = () => {
  return (
    <ErrorBox>
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          color: "white",
          marginTop: "20px",
          fontFamily: "tripSans",
          fontSize: "40px",
        }}
      >
        Error 404
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          color: "white",
          fontFamily: "tripSans",
          fontSize: "40px",
        }}
      >
        {"Page not found :("}
      </Typography>
    </Box>
  </ErrorBox>
  )
}