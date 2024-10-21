import { useEffect, useState } from "react";
import { Grid, Typography, Box, Container, Button } from "@mui/material";
import { styled } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Create a theme with defined shadows
const theme = createTheme({
  shadows: [
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.2)",
    "0px 2px 4px rgba(0, 0, 0, 0.2)",
    "0px 3px 6px rgba(0, 0, 0, 0.2)",
    "0px 4px 8px rgba(0, 0, 0, 0.2)",
    "0px 5px 10px rgba(0, 0, 0, 0.2)",
    "0px 6px 12px rgba(0, 0, 0, 0.2)",
    "0px 7px 14px rgba(0, 0, 0, 0.2)",
    "0px 8px 16px rgba(0, 0, 0, 0.2)",
    // Add more shadows as needed
  ],
});

// Styled component for category box
const CategoryBox = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows?.[4] || "none",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",

    boxShadow: theme.shadows?.[8] || "none",
  },
}));
// Define your Product type according to your JSON structure
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
  image: string; // Category image
  products: Product[];
}

interface Data {
  categories: Category[];
}

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("./products.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Data = await response.json();

      // Flattening all products from all categories
      const allProducts = data.categories.flatMap(
        (category) => category.products
      );
      setProducts(allProducts);
    } catch (error) {
      if (error instanceof Error) {
        setError(`Failed to fetch products: ${error.message}`);
      } else {
        setError("Failed to fetch products");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* Wrap your component with ThemeProvider */}
      <Box padding={2} my={8}>
        <Container>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
            All Products
          </Typography>
          {products.length === 0 ? (
            <Typography variant="body1">No categories available</Typography>
          ) : (
            <Grid container spacing={2}>
              {products.map((category) => (
                <Grid item xs={12} sm={6} md={4} key={category.id}>
                  <CategoryBox>
                    <img
                      src={category.image}
                      alt={category.name}
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: theme.spacing(1), // Use the theme's spacing
                        background: " rgba(0, 0, 0, 0.8)",
                      }}
                    >
                      <Box>
                        <Typography variant="h6" gutterBottom color="white">
                          {category.name}
                        </Typography>
                        <Button
                          sx={{
                            width: "100%",
                            textAlign: "right",
                            bgcolor: "red",
                            color: "white",
                            borderRadius: "10px",
                          }}
                        >
                          Add to Cart
                        </Button>
                      </Box>

                      <Typography variant="h6" gutterBottom color="white">
                        ${category.price}
                      </Typography>
                    </Box>
                  </CategoryBox>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AllProducts;
