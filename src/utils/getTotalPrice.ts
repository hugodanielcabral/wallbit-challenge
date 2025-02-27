import { Product } from "../types/product";

export const getTotalPrice = (products: Product[]) => {
  return (
    products.reduce(
      (acc, currentValue) => acc + currentValue.price * currentValue.quantity,
      0
    ) ?? 0
  );
};
