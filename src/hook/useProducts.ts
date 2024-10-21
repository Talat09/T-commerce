import { useState, useEffect } from "react";
import { IProduct } from "../types/globalTypes";

interface Category {
  id: number;
  name: string;
  products: IProduct[];
}

interface Data {
  categories: Category[];
}

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("./products.json"); // Adjust the path as needed
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

  return { products, loading, error };
};
