import React from "react";
import Home from "../components/MainPage/Home";
import FlashDeals from "../components/flashDeals/FlashDeals";
import TopCate from "../components/top/TopCate";
import Discount from "../components/discount/Discount";
import Annocument from "../components/annocument/Annocument";
import Wrapper from "../components/wrapper/Wrapper";
import NewStocksDeals from "../components/newStocks/NewStocksDeals";

const Pages = ({ addToCart, CartItem }) => {
	return (
		<>
			<Home CartItem={CartItem} />
			<FlashDeals addToCart={addToCart} />
			<TopCate />
			<NewStocksDeals addToCart={addToCart} />
			<Discount addToCart={addToCart} />
			<Annocument />
			<Wrapper />
		</>
	);
};

export default Pages;
