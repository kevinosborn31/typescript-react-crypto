import { MenuItem, Select } from "@mui/material";

interface ICurrencySelectorProps {
  pair: string;
  onChange: () => void;
  currencies: any[];
}

const CurrencySelector: React.FC<ICurrencySelectorProps> = ({
  pair,
  onChange,
  currencies,
}) => {
  return (
    <Select
      labelId="currency-label"
      id="currency"
      value={pair}
      onChange={onChange}
      name="currency"
    >
      {currencies.map((currency, index) => (
        <MenuItem key={index} value={currency.id}>
          {currency.display_name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CurrencySelector;
