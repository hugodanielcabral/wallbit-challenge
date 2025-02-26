import { ChangeEvent, FormEvent, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: "string";
  quantity: number;
}

interface FormValues {
  quantity: number;
  productId: number;
}

export const App = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    quantity: 0,
    productId: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

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
    <div className="bg-gray-300 min-h-screen">
      <header className="bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Tienda Tucu</h1>
      </header>

      <main className="container mx-auto p-4">
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

        <section
          aria-labelledby="cart-title"
          className="bg-white p-4 rounded shadow"
        >
          <h2 id="cart-title" className="text-xl mb-4">
            Carrito de compra
          </h2>
          <section aria-live="polite" className="cart-items">
            {isLoading && <p aria-live="assertive">Cargando productos...</p>}
            {error && (
              <h3 className="text-red-500 font-bold" aria-live="assertive">
                {error}
              </h3>
            )}

            {products.length > 0 ? (
              <table className="w-full border-collapse">
                <caption className="sr-only">Productos en el carrito</caption>
                <thead>
                  <tr className="bg-gray-100">
                    <th scope="col" className="p-2 text-left">
                      Cantidad
                    </th>
                    <th scope="col" className="p-2 text-left">
                      Nombre
                    </th>
                    <th scope="col" className="p-2 text-left">
                      Precio
                    </th>
                    <th scope="col" className="p-2 text-left">
                      Precio total
                    </th>
                    <th scope="col" className="p-2 text-left">
                      Foto
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-t border-gray-200">
                      <td className="p-2">{product.quantity}</td>
                      <td className="p-2">{product.title}</td>
                      <td className="p-2">${product.price}</td>
                      <td className="p-2">${product.price}</td>
                      <td className="p-2">
                        <img
                          className="w-16 h-16 object-contain"
                          src={product.image}
                          alt={`Foto de ${product.title}`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-bold bg-gray-100">
                    <td colSpan={2} className="p-2 text-right">
                      Total:
                    </td>
                    <td className="p-2">${0}</td>
                    <td></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <p>No hay productos en el carrito</p>
            )}
          </section>
        </section>
      </main>
    </div>
  );
};
