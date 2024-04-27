import React from "react";
import RoofingCard from "./RoofingCard";
import "../style.css";

const RoofingDeals = ({ addToCart }) => {
	return (
		<>
			<section className="flash">
				<div className="container">
					<div className="heading f_flex">
						<i className="fa fa-bolt"></i>
						<h1>Roofing Items</h1>
					</div>
					<RoofingCard addToCart={addToCart} />
				</div>
			</section>
		</>
	);
};

export default RoofingDeals;
