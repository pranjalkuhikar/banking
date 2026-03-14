function generateAccountNumber() {
  const bankCode = "9876";
  const random = Math.floor(10000000 + Math.random() * 90000000);
  return bankCode + random;
}

export default generateAccountNumber;
