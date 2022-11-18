// Check if there are tags in common in two given arrays
const checkCommonTags = (
  filterConditions: string[],
  data: string[]
): boolean => {
  const filteredArray = filterConditions.filter((item) => data.includes(item));
  return (
    !!filteredArray.length && filterConditions.length === filteredArray.length
  );
};

export default checkCommonTags;
