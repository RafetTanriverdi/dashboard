export const dollarFormatter = (value) => {
    if (!value) return '';
    const stringValue = value.toString();
    const [integerPart, decimalPart] = stringValue.split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const limitedDecimal = decimalPart ? decimalPart.substring(0, 2) : '';
    return `${formattedInteger}${limitedDecimal ? '.' + limitedDecimal : ''}`;
  };

 export const dollarParser = (value) => {
    if (!value) return '';
    const cleanValue = value.replace(/\$\s?|,/g, '');
    return parseFloat(cleanValue).toFixed(2);
  };
