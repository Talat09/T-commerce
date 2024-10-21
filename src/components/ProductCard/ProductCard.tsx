import { Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/system";

import toast from "react-hot-toast";
import { IProduct } from "../../types/globalTypes";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../redux/hook/hook";

// Styled component for category box (Product Card)
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

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: IProduct) => {
    dispatch(addToCart(product));
    toast.success("Product Added.");
  };

  return (
    <CategoryBox>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
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
          padding: 1,
          background: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom color="white">
            {product.name}
          </Typography>
          <Button
            onClick={() => handleAddToCart(product)}
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
          ${product.price}
        </Typography>
      </Box>
    </CategoryBox>
  );
};

export default ProductCard;
