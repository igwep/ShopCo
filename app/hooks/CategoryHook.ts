import useFetchProductsFromFireStore from "./FetchProductFIreStore";
import { Product } from "../types/Product";

export  const useBeautyProducts = () => {
  const { data } = useFetchProductsFromFireStore();
  const beautyProducts = data?.filter(
    (product: Product) => product.category === "beauty"
  ) || [];

  return beautyProducts;
};

export  const useFragranceProducts = () => {
  const { data } = useFetchProductsFromFireStore();
  const fragranceProducts = data?.filter(
    (product: Product) => product.category === "fragrances"
  ) || [];

  return fragranceProducts;
};
export  const useFurnitureProducts = () => {
  const { data } = useFetchProductsFromFireStore();
  const furnitureProducts = data?.filter(
    (product: Product) => product.category === "furniture"
  ) || [];

  return furnitureProducts;
};
export  const useGroceriesProducts = () => {
  const { data } = useFetchProductsFromFireStore();
  const GroceriesProducts = data?.filter(
    (product: Product) => product.category === "groceries"
  ) || [];

  return GroceriesProducts;
};

