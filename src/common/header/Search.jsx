import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Search = ({ CartItem }) => {
	const [search, setSearch] = useState("");
	const { productItems, setProductItems } = useContext(SearchContext);
	// fixed Header
	window.addEventListener("scroll", function () {
		const search = document.querySelector(".search");
		search.classList.toggle("active", window.scrollY > 100);
	});

	const history = useNavigate();

	const handleKeyDown = async (event) => {
		if (event.key === "Enter") {
			const res = await fetch(`/main/search-product?search=${search}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			console.log(data);
			if (data.status === 200) {
				setProductItems(data.body);
				history("/search");
			}
		}
	};

	return (
		<>
			<section className="search">
				<div className="container c_flex">
					<div className="logo width">
						<span>
							<img src="./images/chars-logo.png" alt="logo" />
						</span>
					</div>

					<div className="search-box f_flex">
						<i className="fa fa-search"></i>
						<input type="text" placeholder="Search and hit enter..." onChange={(event) => setSearch(event.target.value)} onKeyDown={handleKeyDown} />
						<span>All Categories</span>
					</div>

					<div className="icon f_flex width">
						<i className="fa fa-user icon-circle" style={{ cursor: "pointer" }}></i>
						<div className="cart">
							<Link to="/cart">
								<i className="fa fa-shopping-cart icon-circle"></i>
								<span>{CartItem.length === 0 ? "" : CartItem.length}</span>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Search;
