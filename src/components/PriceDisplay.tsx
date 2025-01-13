
// import { useGlobalContext } from '../context/GlobalContext';

// interface PriceDisplayProps {
//   priceInUSD: number;
// }

// const PriceDisplay = ({ priceInUSD }: PriceDisplayProps) => {
//   const { selectedCurrency, currencies } = useGlobalContext();

//   const exchangeRate = currencies[selectedCurrency as keyof typeof currencies] || 1;
//   const convertedPrice = priceInUSD * exchangeRate;

//   return <span>{`${convertedPrice.toFixed(2)} ${selectedCurrency}`}</span>;
// };

// export default PriceDisplay;
