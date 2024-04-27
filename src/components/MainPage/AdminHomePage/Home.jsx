import React from "react";
import "./Home.css";
import SliderHome from "./Slider";

const AdminHome = () => {
	return (
		<>
			<section className="home">
				<div className="container d_flex">
					<SliderHome />
				</div>
			</section>
		</>
	);
};

export default AdminHome;
