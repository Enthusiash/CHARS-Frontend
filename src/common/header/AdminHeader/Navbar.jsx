import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Navbar = (props) => {
	// Toogle Menu
	const [MobileMenu, setMobileMenu] = useState(false);

	const history = useNavigate();

	const logoutAdmin = async () => {
		let token = localStorage.getItem("adminDataToken");

		const res = await fetch("/main/admin-logout", {
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
				localStorage.removeItem("adminDataToken");
				history("/admin-login");
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
								<Link to="/admin-dashboard">HOME</Link>
							</li>
							<li>
								<Link to="/admin/add-user-account">ADD USER ACCOUNT</Link>
							</li>
							<li>
								<Link to="/admin/add-supplier-account">ADD SUPPLIER ACCOUNT</Link>
							</li>
							<li>
								<Link to="/admin/add-admin-account">ADD ADMIN ACCOUNT</Link>
							</li>
							<li>
								<Link
									onClick={() => {
										logoutAdmin();
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
