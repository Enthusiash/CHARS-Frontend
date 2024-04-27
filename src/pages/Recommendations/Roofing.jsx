import React from "react";
import RoofingDeals from "../../components/recommendations/roofing/RoofingDeals";

const Roofing = ({ addToCart }) => {
	return (
		<>
			<RoofingDeals addToCart={addToCart} />
		</>
	);
};

export default Roofing;
