import React from "react";
import ElectricalDeals from "../../components/recommendations/electrical/ElectricalDeals";

const Electrical = ({ addToCart }) => {
	return (
		<>
			<ElectricalDeals addToCart={addToCart} />
		</>
	);
};

export default Electrical;
