export const getCssVariable = (name) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  return parseFloat(value) || 0;
};
