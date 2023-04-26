const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
};

export default capitalizeWords;
