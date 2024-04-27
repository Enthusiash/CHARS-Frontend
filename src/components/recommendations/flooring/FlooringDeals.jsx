import React from "react";
import FramingCard from "./FlooringCard";
import "../style.css";

const FlooringDeals = ({ addToCart }) => {
	return (
		<>
			<section className="flash">
				<div className="container">
					<div className="heading f_flex">
						<i className="fa fa-bolt"></i>
						<h1>Flooring Items</h1>
					</div>
					<FramingCard addToCart={addToCart} />
				</div>
			</section>
		</>
	);
};

export default FlooringDeals;
