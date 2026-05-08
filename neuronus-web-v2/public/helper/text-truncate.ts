export const textTruncate = (text: string, value: number) => {
  return text.length > value ? `${text.substring(0, value)}...` : text;
};
