import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Categories from "../../components/MainPage/Categories";
import { message } from "antd";

const Navbar = (props) => {
	// Toogle Menu
	const [MobileMenu, setMobileMenu] = useState(false);

	const history = useNavigate();

	const logoutUser = async () => {
		let token = localStorage.getItem("userDataToken");

		const res = await fetch("/main/user-logout", {
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
				localStorage.removeItem("userDataToken");
				history("/");
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
					<div className="recommendation" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "1rem", marginBottom: "35px" }}>
						<span className="fa-solid fa-border-all"></span>
						<Categories />
					</div>
					<div className="navlink">
						<ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={() => setMobileMenu(false)}>
							{/*<ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>*/}
							<li>
								<Link to="/home">HOME</Link>
							</li>
							<li>
								<Link to="/recommendation">RECOMMENDATION</Link>
							</li>
							<li>
								<Link to="/track">TRACK MY ORDER</Link>
							</li>
							<li>
								<Link to="/contact">CONTACT</Link>
							</li>
							<li>
								<Link
									onClick={() => {
										logoutUser();
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
