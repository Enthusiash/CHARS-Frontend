import React from "react";
import ElectricalCard from "./ElectricalCard";
import "../style.css";

const ElectricalDeals = ({ addToCart }) => {
	return (
		<>
			<section className="flash">
				<div className="container">
					<div className="heading f_flex">
						<i className="fa fa-bolt"></i>
						<h1>Electrical Items</h1>
					</div>
					<ElectricalCard addToCart={addToCart} />
				</div>
			</section>
		</>
	);
};

export default ElectricalDeals;
