// Generating array with desired length. Used for mapping options.
export const arrayGen = (count) => {
  return Array.from({ length: count }, (_, i) => i );
};
