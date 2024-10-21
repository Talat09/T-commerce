import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { Link } from "react-router-dom";

// Keyframes for the 404 number animation (scale up and down)
const bounce = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

// Keyframes for the text fade-in
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Keyframes for the button hover effect
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const NotFoundSection = styled(Box)({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f8f9fa",
  textAlign: "center",
  position: "relative",
  flexDirection: "column",
  padding: "0 20px",
});

const NotFoundNumber = styled(Typography)(({ theme }) => ({
  fontSize: "10rem",
  fontWeight: "bold",
  color: theme.palette.primary.main,
  animation: `${bounce} 2s infinite`, // Bouncing effect on the 404 number
}));

const NotFoundText = styled(Typography)({
  fontSize: "1.5rem",
  marginBottom: "20px",
  animation: `${fadeIn} 2s ease-in`, // Smooth fade-in animation for text
});

const BackButton = styled(Button)({
  animation: `${slideUp} 2.5s ease-out`, // Slide up animation for the button
  backgroundColor: "red",
  color: "white",
  padding: "10px 20px",
  borderRadius: "50px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "darkred",
  },
});

const NotFoundPage: React.FC = () => {
  return (
    <NotFoundSection>
      <NotFoundNumber variant="h1" sx={{ color: "red" }}>
        404
      </NotFoundNumber>
      <NotFoundText variant="h5">
        Oops! The page you're looking for doesn't exist.
      </NotFoundText>
      <Link to="/">
        <BackButton variant="contained">Go Back Home</BackButton>
      </Link>
    </NotFoundSection>
  );
};

export default NotFoundPage;
