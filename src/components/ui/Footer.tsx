import { Typography, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-8 mt-8">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              component={Link} // Make the logo a link
              to="/" // Link to home page
              sx={{
               fontSize: "1.5rem",
                fontWeight: 600,
                textDecoration: "none",
                color: "inherit",
              }} // Ensure it inherits color and remove underline
            >
              <span style={{ color: "red" }}>T </span>- Commerce
            </Typography>
            <Typography variant="body2">
              E-Shop is your one-stop destination for all your shopping needs.
              We offer a wide range of high-quality products at competitive
              prices.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Typography variant="body2">
              <ul style={{ listStyle: "none", padding: "0" }}>
                <li>Contact Us</li>
                <li>Shipping Information</li>
                <li>Returns & Exchanges</li>
                <li>FAQ</li>
              </ul>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body2">
              <ul style={{ listStyle: "none", padding: "0" }}>
                <li>Home</li>
                <li>Products</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Typography variant="body2">
              Stay connected with us on social media for the latest updates and
              promotions.
            </Typography>
            {/* Add social media icons here */}
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          © {new Date().getFullYear()} E-Shop. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
