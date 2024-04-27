import React from "react";
import NewStocksCard from "./NewStocksCard";
import "./style.css";

const NewStocksDeals = ({ addToCart }) => {
	return (
		<>
			<section className="flash">
				<div className="container">
					<div className="heading f_flex">
						<div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
							<img src="https://img.icons8.com/glyph-neue/64/26e07f/new.png" alt="NewStocks" />
							<h1 style={{ marginTop: "10px" }}>New Stocks</h1>
						</div>
					</div>
					<NewStocksCard addToCart={addToCart} />
				</div>
			</section>
		</>
	);
};

export default NewStocksDeals;
