export const extractNumericPart = (inputString) => {
  // Find the index where the numeric part starts
  const startIndex = inputString.search(/\d/);

  if (startIndex !== -1) {
    // Extract the numeric part from the string
    const amountString = inputString.substring(startIndex).trim();

    // Convert the amount string to a number
    const extractedAmount = parseFloat(amountString);

    return extractedAmount;
  }
  console.error("[ERROR] - [extractNumericPart] - No numeric part found");
  return 0; // or you can throw an error, return a default value, etc.
};
