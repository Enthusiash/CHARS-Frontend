import React from "react";
import MasonryDeals from "../../components/recommendations/masonry/MasonryDeals";

const Masonry = ({ addToCart }) => {
	return (
		<>
			<MasonryDeals addToCart={addToCart} />
		</>
	);
};

export default Masonry;
