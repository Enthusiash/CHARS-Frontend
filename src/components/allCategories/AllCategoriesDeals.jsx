import React from "react";
import AllCategoriesCard from "./AllCategoriesCard";
import "./style.css";

const AllCategoriesDeals = ({ addToCart }) => {
	return (
		<>
			<section className="flash">
				<div className="container">
					<div className="heading f_flex">
						<div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
							<img src="https://img.icons8.com/glyph-neue/64/26e07f/new.png" alt="AllCategories" />
							<h1 style={{ marginTop: "10px" }}>All Categories</h1>
						</div>
					</div>
					<AllCategoriesCard addToCart={addToCart} />
				</div>
			</section>
		</>
	);
};

export default AllCategoriesDeals;
