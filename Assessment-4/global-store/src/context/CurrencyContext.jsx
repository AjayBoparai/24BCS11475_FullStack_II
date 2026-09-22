import { createContext, useContext, useState } from "react";

const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.75,
  JPY: 110,
};

const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
};

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");

  const changeCurrency = (currencyCode) => {
    setCurrency(currencyCode);
  };

  const formatPrice = (usdAmount) => {
    if (EXCHANGE_RATES[currency]) {
      const convertedAmount =
        usdAmount * EXCHANGE_RATES[currency];

      return `${CURRENCY_SYMBOLS[currency]}${convertedAmount.toFixed(2)}`;
    }

    return `${usdAmount.toFixed(2)} ${currency}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        changeCurrency,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  return useContext(CurrencyContext);
};