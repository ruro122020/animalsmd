//Since this filter function is using "name" to filter the objects
//in the array, each object must have a name property or adjust the
//filter function to accomodate filtering by a different property

const filterBySearch = (arr, string) => {
  return arr.filter((obj) => {
    return string === ""
      ? obj
      : obj.name.toLowerCase().includes(string.toLowerCase());
  });
};

export default filterBySearch;
