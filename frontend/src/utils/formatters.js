export const capitalizeWords = (
  text
) => {
  if (!text) return "";

  return text
    .split(" ")
    .map((word) => {
      return (
        word.charAt(0).toUpperCase() +
        word.slice(1)
      );
    })
    .join(" ");
};