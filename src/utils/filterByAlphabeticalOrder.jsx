const filterByAlphabeticalOrder = (arr) => {
  return arr.sort((objA, objB) => {
    const nameA = objA.name.toUpperCase();
    const nameB = objB.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};

export default filterByAlphabeticalOrder;
