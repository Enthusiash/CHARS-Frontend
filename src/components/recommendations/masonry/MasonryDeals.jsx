import React from "react";
import MasonryCard from "./MasonryCard";
import "../style.css";

const MasonryDeals = ({ addToCart }) => {
	return (
		<>
			<section className="flash">
				<div className="container">
					<div className="heading f_flex">
						<i className="fa fa-bolt"></i>
						<h1>Masonry Items</h1>
					</div>
					<MasonryCard addToCart={addToCart} />
				</div>
			</section>
		</>
	)
};

export default MasonryDeals;