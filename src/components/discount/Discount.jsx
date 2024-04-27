import React from "react";
import Dcard from "./Dcard";

const Discount = ({ addToCart }) => {
	return (
		<>
			<section className="flash">
				<div className="container">
					<div className="heading f_flex">
						<div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
							<img src="https://img.icons8.com/windows/32/fa314a/gift.png" alt="Discounted" />
							<h1 style={{ marginTop: "10px" }}>Discounted Items</h1>
						</div>
					</div>
					<Dcard addToCart={addToCart} />
				</div>
			</section>
		</>
	);
};

export default Discount;
