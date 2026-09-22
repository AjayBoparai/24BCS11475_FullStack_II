import { useCurrency } from "../context/CurrencyContext";

const ProductList = () => {
  const { formatPrice } = useCurrency();

  return (
    <section>
      <h2>Product List</h2>

      <h3>Wireless Headphones</h3>

      <p>Price: {formatPrice(100)}</p>
    </section>
  );
};

export default ProductList;