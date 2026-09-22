import { CurrencyProvider } from "./context/CurrencyContext";
import StoreHeader from "./components/StoreHeader";
import ProductList from "./components/ProductList";
import CheckoutCart from "./components/CheckoutCart";

function App() {
  return (
    <CurrencyProvider>
      <StoreHeader />
      <ProductList />
      <CheckoutCart />
    </CurrencyProvider>
  );
}

export default App;