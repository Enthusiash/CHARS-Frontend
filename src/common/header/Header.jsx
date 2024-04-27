import React from "react";
import "./Header.css";
import Head from "./Head";
import Search from "./Search";
import Navbar from "./Navbar";

const Header = ({ CartItem, data, LoginValid }) => {
	return (
		<>
			<Head />
			<Search CartItem={CartItem} />
			<Navbar data={data} LoginValid={LoginValid} />
		</>
	);
};

export default Header;
