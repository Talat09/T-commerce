import React from "react";
import Slider from "react-slick";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { MouseEventHandler } from "react";
import image1 from "../../assets/1.jpg";
import image2 from "../../assets/2.jpg";
import image3 from "../../assets/3.jpg";
// Carousel items array
const carouselItems = [
  {
    title: "Welcome to Our Website",
    description: "This is the first item description",
    imageUrl: image1,
  },
  {
    title: "Welcome to Our Website",
    description: "This is the second item description",
    imageUrl: image2,
  },
  {
    title: "Welcome to Our Website",
    description: "This is the third item description",
    imageUrl: image3,
  },
];

// Next Arrow Component
const NextArrow: React.FC<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick }) => (
  <Button
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      right: 0,
      zIndex: 1,
      transform: "translateY(-50%)",
    }}
  >
    <ArrowForwardIos />
  </Button>
);

// Prev Arrow Component
const PrevArrow: React.FC<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick }) => (
  <Button
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      left: 0,
      zIndex: 1,
      transform: "translateY(-50%)",
    }}
  >
    <ArrowBackIos />
  </Button>
);

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ maxWidth: "80%", margin: "0 auto", py: { md: 4, xs: 2 } }}>
      <Slider {...settings}>
        {carouselItems.map((item, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              maxHeight: 500,
              minHeight: 400,
              position: "relative",
            }}
          >
            <CardMedia
              component="img"
              image={item.imageUrl}
              alt={item.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Makes sure the image fully covers the area
                position: "absolute", // Ensures it spans the entire card area
                top: 0,
                left: 0,
                zIndex: 1,
              }}
            />
            <CardContent
              sx={{
                position: "relative", // Keeps the content above the image
                zIndex: 1,
                top: 100,
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent background
                color: "white",
              }}
            >
              <Typography variant="h5" sx={{ fontSize: "48px" }}>
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: "24px" }}
              >
                {item.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, bgcolor: "white", color: "red",borderRadius:"20px" ,fontWeight:"bold" }}
              >
                Shop Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
