import React from "react";
import FramingDeals from "../../components/recommendations/framing/FramingDeals";

const Framing = ({ addToCart }) => {
	return (
		<>
			<FramingDeals addToCart={addToCart} />
		</>
	);
};

export default Framing;
