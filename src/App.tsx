export const App = () => {
  return (
    <div className="bg-gray-300 min-h-screen">
      <header className="bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Tienda Tucu</h1>
      </header>

      <main className="container mx-auto p-4">
        <section aria-labelledby="product-form-title" className="mb-8 bg-white p-4 rounded shadow">
          <h2 id="product-form-title" className="text-xl mb-4">Agrega los productos al carro de compras</h2>
          <form aria-label="Formulario de productos">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="mb-2 md:mb-0">
                <label htmlFor="product-quantity" className="block mb-1">Cantidad:</label>
                <input 
                  type="number" 
                  id="product-quantity"
                  name="quantity"
                  placeholder="Cantidad" 
                  min={0} 
                  max={100}
                  className="p-2 border rounded w-full"
                  aria-required="true"
                />
              </div>
              <div className="mb-2 md:mb-0">
                <label htmlFor="product-id" className="block mb-1">ID del Producto:</label>
                <input 
                  type="text" 
                  id="product-id"
                  name="productId"
                  placeholder="ID del Producto" 
                  className="p-2 border rounded w-full"
                  aria-required="true"
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

        <section aria-labelledby="cart-title" className="bg-white p-4 rounded shadow">
          <h2 id="cart-title" className="text-xl mb-4">Carrito de compra</h2>
          <div aria-live="polite" className="cart-items">
            {/* Aquí irán los items del carrito */}
          </div>
        </section>
      </main>
    </div>
  );
};