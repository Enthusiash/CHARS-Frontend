import React from "react";
import "antd/dist/antd.min.css";
import "./Home.css";
import { Link } from "react-router-dom";
import { Button, Dropdown, Menu } from "antd";

const menu = (
	<Menu
		items={[
			{
				key: "1",
				label: <Link to="/electrical-items">Electrical</Link>,
			},
			{
				key: "2",
				label: <Link to="/masonry-items">Masonry</Link>,
			},
			{
				key: "3",
				label: <Link to="/steel-items">Steel</Link>,
			},
			{
				key: "4",
				label: <Link to="/roofing-items">Roofing</Link>,
			},
			{
				key: "5",
				label: <Link to="/concreting-items">Concreting</Link>,
			},
			{
				key: "6",
				label: <Link to="/flooring-items">Flooring</Link>,
			},
			{
				key: "7",
				label: <Link to="/framing-items">Framing</Link>,
			},
		]}
	/>
);

const Categories = () => (
	<>
		<Dropdown className="catDropdown" overlay={menu} placement="bottomLeft" arrow>
			<Button className="recButton">Categories</Button>
		</Dropdown>
	</>
);

export default Categories;
