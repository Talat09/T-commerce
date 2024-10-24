import { Box, Container, Grid, Typography } from "@mui/material";

import { IProduct } from "../types/globalTypes";
import { useProducts } from "../hook/useProducts";
import ProductCard from "../components/ProductCard/ProductCard";

const AllProducts = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box padding={2} my={8}>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          All Products
        </Typography>
        <Grid container spacing={2}>
          {products.length > 0 ? (
            products.map((product: IProduct) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No products available.</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default AllProducts;
