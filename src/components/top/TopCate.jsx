import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import TopCart from "./TopCart";

const TopCate = () => {
	return (
		<>
			<section className="TopCate background">
				<div className="container">
					<div className="heading d_flex">
						<div className="heading-left row  f_flex">
							<i className="fa-solid fa-border-all"></i>
							<h2>Categories </h2>
						</div>
						<div className="heading-right row ">
							<Link to={"/all-categories"}>
								<span>View all</span>
								<i className="fa-solid fa-caret-right"></i>
							</Link>
						</div>
					</div>
					<TopCart />
				</div>
			</section>
		</>
	);
};

export default TopCate;
