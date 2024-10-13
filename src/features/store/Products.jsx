import React, { useState } from "react";
import ProductCard from "./components/ProductCard";
import Hero from "./components/Hero";
import useProducts from "./hooks/useProducts";
import filterBySearch from "../../utils/filterByAlphabeticalOrder";
import filterByAlphabeticalOrder from "../../utils/filterByAlphabeticalOrder";
import filterByPrice from "../../utils/filterByPrice";

const Products = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const { products, isLoading, error: productsError } = useProducts();

  //first check if products data has been loaded
  if (isLoading) return <p>Loading...</p>;
  if (productsError) return <p>Product Error: {productsError}</p>;

  let filteredProducts = filterBySearch(products, search);

  if (sortBy === "A-Z") {
    filteredProducts = filterByAlphabeticalOrder(products);
  } else if (sortBy === "price-low-high") {
    filteredProducts = filterByPrice(products, "price-low-high");
  } else if (sortBy === "price-high-low") {
    filteredProducts = filterByPrice(products, "price-high-low");
  }

  return (
    <div style={{ backgroundColor: "#fcfbf5" }}>
      <header>
        <Hero />
      </header>
      <main>
        {/**SEARCH INPUT */}
        <div>
          <label>Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/**SORT BY ALPHEBET INPUT */}
          <div>
            <fieldset>
              <legend>Sort</legend>
              <div>
                <input
                  type="radio"
                  name="sort"
                  id="A-Z"
                  value="A-Z"
                  onClick={(e) => setSortBy(e.target.value)}
                />
                <label for="A-Z">A-Z</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="price-low-high"
                  name="sort"
                  value="price-low-high"
                  onClick={(e) => setSortBy(e.target.value)}
                />
                <label for="price-low-high">Price - Low to High</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="price-high-low"
                  name="sort"
                  value="price-high-low"
                  onClick={(e) => setSortBy(e.target.value)}
                />
                <label for="price-high-low">Price - High to Low</label>
              </div>
            </fieldset>
          </div>
        </div>

        {/*This div holds the products items*/}
        <div>
          {filteredProducts.map((product) => {
            return (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Products;
