export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency);
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase();
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-');
  return arr[arr.length - 1];
};

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '');

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`;
};

export function renderCategories(productTypeName: string) {
  if (productTypeName == 'Board mạch') {
    return 'BRD';
  } else if (productTypeName == 'Cảm biến') {
    return 'CBI';
  } else if (productTypeName == 'Hiển thị') {
    return 'DSP';
  } else if (productTypeName == 'Module') {
    return 'MOD';
  } else if (productTypeName == 'IC') {
    return 'IC';
  } else if (productTypeName == 'Relay') {
    return 'RLY';
  } else if (productTypeName == 'Linh kiện bán dẫn') {
    return 'SMT';
  }
  return productTypeName;
}
