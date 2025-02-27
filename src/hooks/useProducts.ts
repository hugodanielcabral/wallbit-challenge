import { useState, useEffect } from "react";
import type { Product } from "../types/product";
import { FormValues } from "../types/formValues";

const STORAGE_KEY = "cart-products";

export const useProducts = (formValues: FormValues) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const storedProducts = localStorage.getItem(STORAGE_KEY);
      return storedProducts ? JSON.parse(storedProducts) : [];
    } catch (error) {
      console.error("Error loading products from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error("Error saving products to localStorage:", error);
    }
  }, [products]);

  const getProduct = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!id || typeof id !== "number") {
        setError("ID inválido");
        return null;
      }

      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (response.status !== 200)
        throw new Error(
          "Ocurrió un error al traer el producto: " + response.statusText
        );

      const data = await response.json();

      setProducts((prev) => [
        ...prev,
        { ...data, quantity: formValues.quantity },
      ]);
    } catch (error) {
      setError("Error al cargar los productos");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = (id: number) => {
    const filteredProduct = products.filter((p) => p.id !== id);

    setProducts(filteredProduct);
  };

  const clearCart = () => {
    setProducts([]);
  };

  return {
    isLoading,
    error,
    products,
    setProducts,
    getProduct,
    deleteProduct,
    clearCart,
  };
};
