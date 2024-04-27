import React from "react";
import "./style.css";

const Footer = () => {
	return (
		<>
			<footer>
				<div className="container grid2">
					<div className="box">
						<h1>CHARS</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus
							vel ut sollicitudin elit at amet.
						</p>
					</div>

					<div className="box">
						<h4>About Us</h4>
						<ul>
							<li>Careers</li>
							<li>Our Stores</li>
							<li>Our Cares</li>
							<li>Terms & Conditions</li>
							<li>Privacy Policy</li>
						</ul>
					</div>
					<div className="box">
						<h4>Customer Care</h4>
						<ul>
							<li>Help Center </li>
							<li>How to Buy </li>
							<li>Track Your Order </li>
							<li>Corporate & Bulk Purchasing </li>
							<li>Returns & Refunds </li>
						</ul>
					</div>
					<div className="box">
						<h4>Contact Us</h4>
						<ul>
							<li>Camella Homes Fiorenza, Mc'Arthur Highway, Paligui, Apalit, Pampanga</li>
							<li>Email: support@chars.com</li>
							<li>Phone: +1 1123 456 780</li>
						</ul>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
