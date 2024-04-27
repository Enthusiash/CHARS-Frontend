import React, { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = (props) => {
	// Toogle Menu
	const [MobileMenu, setMobileMenu] = useState(false);

	const history = useNavigate();

	const logoutSupplier = async () => {
		let token = localStorage.getItem("supplierDataToken");

		const res = await fetch("/main/supplier-logout", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
				Accept: "application/json",
			},
			credentials: "include",
		});

		const data = await res.json();

		if (data.status === 201) {
			message.warn("Your account is logging out");
			setTimeout(() => {
				localStorage.removeItem("supplierDataToken");
				history("/supplier-login");
				props.LoginValid();
			}, 4000);
		} else {
			message.error("Error Occured");
		}
	};

	return (
		<>
			<header className="header">
				<div className="container d_flex">
					<div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "1rem", marginBottom: "35px" }}></div>
					<div className="navlink">
						<ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={() => setMobileMenu(false)}>
							{/*<ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>*/}
							<li>
								<Link to="/supplier-dashboard">HOME</Link>
							</li>
							<li>
								<Link to="/supplier/add-product">ADD PRODUCT</Link>
							</li>
							<li>
								<Link to="/supplier/orders">ORDERS</Link>
							</li>
							<li>
								<Link to="/supplier/payments-and-transactions">PAYMENTS & TRANSACTIONS</Link>
							</li>
							<li>
								<Link to="/supplier/contact">CONTACT</Link>
							</li>
							<li>
								<Link
									onClick={() => {
										logoutSupplier();
									}}
								>
									LOGOUT
								</Link>
							</li>
						</ul>

						<button className="toggle" onClick={() => setMobileMenu(!MobileMenu)}>
							{MobileMenu ? <i className="fas fa-times close home-btn"></i> : <i className="fas fa-bars open"></i>}
						</button>
					</div>
				</div>
			</header>
		</>
	);
};

export default Navbar;
