 export const formatPrices = (price: number, discountPercentage?: number) => {
  const discount = discountPercentage || 0;
  const discountedPrice = discount > 0
    ? +(price - (price * discount) / 100).toFixed(2)
    : price;

  return {
    originalPrice: price.toFixed(2),
    discountedPrice: discountedPrice.toFixed(2),
    discount,
    isDiscounted: discount > 0,
  };
};

export const getStarRating = (rating = 0) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return { fullStars, hasHalfStar };
};