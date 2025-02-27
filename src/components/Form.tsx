import { ChangeEvent, FormEvent, useState } from "react";
import { FormValues } from "../types/formValues";
import { useProducts } from "../hooks/useProducts";

export const Form = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    quantity: 0,
    productId: 0,
  });

  const { getProduct, products, setProducts } = useProducts(formValues);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: Number(value),
    }));
  };

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const existingProduct = products.find((p) => p.id === formValues.productId);
    if (existingProduct) {
      //* Actualizo la cantidad del producto si ya existe
      setProducts((prev) =>
        prev.map((product) =>
          product.id === formValues.productId
            ? { ...product, quantity: product.quantity + formValues.quantity }
            : product
        )
      );
    } else {
      await getProduct(formValues.productId);
    }

    setFormValues({
      quantity: 0,
      productId: 0,
    });
  };

  return (
    <section
      aria-labelledby="product-form-title"
      className="mb-8 bg-white p-4 rounded shadow"
    >
      <h2 id="product-form-title" className="text-xl mb-4">
        Agrega los productos al carro de compras
      </h2>
      <form onSubmit={onFormSubmit} aria-label="Formulario de productos">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="mb-2 md:mb-0">
            <label htmlFor="product-quantity" className="block mb-1">
              Cantidad:
            </label>
            <input
              type="number"
              id="product-quantity"
              name="quantity"
              placeholder="Cantidad"
              min={0}
              max={100}
              className="p-2 border rounded w-full"
              aria-required="true"
              value={formValues.quantity}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-2 md:mb-0">
            <label htmlFor="product-id" className="block mb-1">
              ID del Producto:
            </label>
            <input
              type="number"
              id="product-id"
              name="productId"
              placeholder="ID del Producto"
              className="p-2 border rounded w-full"
              aria-required="true"
              value={formValues.productId}
              onChange={onInputChange}
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              aria-label="Agregar producto al carrito"
            >
              Agregar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
