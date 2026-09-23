import { Product } from "./Product";

export function ProductsGrid({ products, loadCart }) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return <Product product={product} loadCart={loadCart} />;
      })}
    </div>
  );
}
