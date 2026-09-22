import { useCurrency } from "../context/CurrencyContext";

const CheckoutCart = () => {
  const { formatPrice } = useCurrency();

  return (
    <section>
      <h2>Checkout Cart</h2>

      <p>Subtotal: {formatPrice(150)}</p>
    </section>
  );
};

export default CheckoutCart;