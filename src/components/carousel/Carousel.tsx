import React, { useMemo } from "react";
import Slider from "react-slick";
import { Card, CardContent, CardMedia, Button, Box } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { MouseEventHandler } from "react";
import image1 from "../../assets/4.png";
import image2 from "../../assets/5.png";
import image3 from "../../assets/6.png";

// Carousel items array
const carouselItems = [
  {
    description: "This is the first item description",
    imageUrl: image1,
  },
  {
    description: "This is the second item description",
    imageUrl: image2,
  },
  {
    description: "This is the third item description",
    imageUrl: image3,
  },
];

// Next Arrow Component
const NextArrow: React.FC<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
}> = React.memo(({ onClick }) => (
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
));

// Prev Arrow Component
const PrevArrow: React.FC<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
}> = React.memo(({ onClick }) => (
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
));

// Memoize the entire Carousel to prevent unnecessary re-renders
const Carousel: React.FC = React.memo(() => {
  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      autoplay: true,
      autoplaySpeed: 3000,
    }),
    []
  );

  return (
    <Box
      sx={{
        maxWidth: "100%",
        maxHeight: "100%",
        margin: "auto",
        py: { md: 4, xs: 2 },
      }}
    >
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
              loading="lazy"
              srcSet={`${item.imageUrl}?w=480 480w, ${item.imageUrl}?w=800 800w`}
              sizes="(max-width: 600px) 480px, 800px"
              image={item.imageUrl}
              alt={item.description}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
              }}
            />

            <CardContent
              sx={{
                position: "relative",
                zIndex: 1,
                top: 200,
                left: 50,
                width: "100%",
                color: "white",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  px: 6,
                  py: 1,
                  bgcolor: "white",
                  color: "red",
                  borderRadius: "20px",
                  fontWeight: "bold",
                }}
              >
                Shop Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </Box>
  );
});

export default Carousel;
