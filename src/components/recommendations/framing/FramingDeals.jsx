import React from "react";
import FramingCard from "./FramingCard";
import "../style.css";

const FramingDeals = ({ addToCart }) => {
	return (
		<>
			<section className="flash">
				<div className="container">
					<div className="heading f_flex">
						<i className="fa fa-bolt"></i>
						<h1>Framing Items</h1>
					</div>
					<FramingCard addToCart={addToCart} />
				</div>
			</section>
		</>
	);
};

export default FramingDeals;
