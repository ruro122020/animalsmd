const filterBySearch = (products, searchTerm) => {
  return products.filter((product) => {
    return searchTerm === ""
      ? product
      : product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
};

export default filterBySearch;
