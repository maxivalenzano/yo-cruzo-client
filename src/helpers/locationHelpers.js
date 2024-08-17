export const getFormattedAddress = (data) => {
  if (typeof data === 'string') {
    return data;
  }

  const addressSplit = data?.description?.split(',');
  const street = addressSplit?.[0] ?? '';
  const city = addressSplit?.[1]?.trim() ?? '';
  return { street, city };
};
