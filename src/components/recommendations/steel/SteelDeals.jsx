import React from "react";
import SteelCard from "./SteelCard";
import "../style.css";

const SteelDeals = ({ addToCart }) => {
	return (
		<>
			<section className="flash">
				<div className="container">
					<div className="heading f_flex">
						<i className="fa fa-bolt"></i>
						<h1>Steel Items</h1>
					</div>
					<SteelCard addToCart={addToCart} />
				</div>
			</section>
		</>
	);
};

export default SteelDeals;
