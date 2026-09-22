import { useCurrency } from "../context/CurrencyContext";

const StoreHeader = () => {
  const { currency, changeCurrency } = useCurrency();

  const currencies = ["USD", "EUR", "GBP", "JPY"];

  return (
    <header>
      <h1>Global Store</h1>

      <div>
        {currencies.map((code) => (
          <button
            key={code}
            onClick={() => changeCurrency(code)}
            style={{
              fontWeight:
                currency === code ? "bold" : "normal",
            }}
          >
            {code}
          </button>
        ))}
      </div>
    </header>
  );
};

export default StoreHeader;