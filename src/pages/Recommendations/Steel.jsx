import React from "react";
import SteelDeals from "../../components/recommendations/steel/SteelDeals";

const Steel = ({ addToCart }) => {
	return (
		<>
			<SteelDeals addToCart={addToCart} />
		</>
	);
};

export default Steel;
