import React from "react";
import InteriorCard from "./InteriorCard";
import "./style.css";

const InteriorDeals = ({ addToCart }) => {
	return (
		<>
			<section className="flash">
				<div className="container">
					<div className="heading f_flex">
						<div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
							<i className="fa fa-bolt"></i>
							<h1 style={{ marginTop: "10px" }}>Recommended</h1>
						</div>
					</div>
					<InteriorCard addToCart={addToCart} />
				</div>
			</section>
		</>
	);
};

export default InteriorDeals;
