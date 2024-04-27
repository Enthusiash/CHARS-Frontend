import React from "react";
import FlooringDeals from "../../components/recommendations/flooring/FlooringDeals";

const Flooring = ({ addToCart }) => {
	return (
		<>
			<FlooringDeals addToCart={addToCart} />
		</>
	);
};

export default Flooring;
