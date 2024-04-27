import React from "react";
import "./Header.css";
import Head from "./Head";
import Search from "./Search";
import Navbar from "./Navbar";

const SupplierHeader = ({ CartItem, LoginValid }) => {
	return (
		<>
			<Head />
			<Search CartItem={CartItem} />
			<Navbar LoginValid={LoginValid} />
		</>
	);
};

export default SupplierHeader;
