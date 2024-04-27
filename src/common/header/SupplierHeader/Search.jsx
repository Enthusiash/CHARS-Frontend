import React from "react";

const Search = () => {
	// fixed Header
	window.addEventListener("scroll", function () {
		const search = document.querySelector(".search");
		search.classList.toggle("active", window.scrollY > 100);
	});

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
						<input type="text" placeholder="Search and hit enter..." />
						<span>All Categories</span>
					</div>
					<div className="icon f_flex width">
						<i className="fa fa-user icon-circle" style={{ cursor: "pointer" }}></i>
					</div>
				</div>
			</section>
		</>
	);
};

export default Search;
