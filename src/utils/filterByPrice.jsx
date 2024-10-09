const filterByPrice = (arr, filter) => {
  return arr.sort((objA, objB) => {
    if (filter === "price-low-high") {
      return objA.price - objB.price;
    } else if (filter === "price-high-low") {
      return objB.price - objA.price;
    }
  });
};

export default filterByPrice;
