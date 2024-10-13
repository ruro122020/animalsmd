import useGetMethod from "../../../hooks/useGetMethod";

const URL = "/api/products";

const useProducts = () => {
  const { data: products, isLoading, error } = useGetMethod({ url: URL });

  return { products, isLoading, error };
};

export default useProducts;
