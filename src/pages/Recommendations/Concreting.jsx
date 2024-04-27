import React from "react";
import ConcretingDeals from "../../components/recommendations/concreting/ConcretingDeals";

const Concreting = ({ addToCart }) => {
	return (
		<>
			<ConcretingDeals addToCart={addToCart} />
		</>
	);
};

export default Concreting;
