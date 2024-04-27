import React from "react";
import ConcretingCard from "./ConcretingCard";
import "../style.css";

const ConcretingDeals = ({ addToCart }) => {
	return (
		<>
			<section className="flash">
				<div className="container">
					<div className="heading f_flex">
						<i className="fa fa-bolt"></i>
						<h1>Concreting Items</h1>
					</div>
					<ConcretingCard addToCart={addToCart} />
				</div>
			</section>
		</>
	);
};

export default ConcretingDeals;
