import React from "react";
import RecommendedCard from "./RecommendedCard";
import "./style.css";

const RecommendDesign = () => {
	return (
		<>
			<section className="flash">
				<div className="container">
					<div className="heading f_flex">
						<i className="fa fa-bolt"></i>
						<h1>Recommendation</h1>
					</div>
					<RecommendedCard />
				</div>
			</section>
		</>
	);
};

export default RecommendDesign;
