const capitalizeWords = (str: string | undefined): string => {
  if (str === undefined) {
    throw new Error(
      'capitalizeWords: str is undefined. Please provide a valid string'
    );
  }
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
};

export default capitalizeWords;
