import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LoginContext } from "./context/Context";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Masonry from "./pages/Recommendations/Masonry";
import Electrical from "./pages/Recommendations/Electrical";
import Steel from "./pages/Recommendations/Steel";
import Concreting from "./pages/Recommendations/Concreting";
import Framing from "./pages/Recommendations/Framing";
import Roofing from "./pages/Recommendations/Roofing";
import Flooring from "./pages/Recommendations/Flooring";
import Data from "./components/Data";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import Sdata from "./components/shops/Sdata";
import AllCategoriesDeals from "./components/allCategories/AllCategoriesDeals";
import SearchDeals from "./components/search/SearchDeals";
import InteriorDeals from "./components/interior/InteriorDeals";
import ROUTES from "./Routes/routes";
import UserLoginPage from "./pages/Login/UserLoginPage";
import UserContactPage from "./pages/UserDashboard/UserContactPage";
import TrackOrderPage from "./pages/UserDashboard/TrackOrderPage";
import VendorLoginPage from "./pages/Login/VendorLoginPage";
import SupplierOrderPage from "./pages/SupplierDashboard/SupplierOrderPage";
import PaymentAndTransactionPage from "./pages/SupplierDashboard/PaymentAndTransactionPage";
import SupplierHeader from "./common/header/SupplierHeader/Header";
import SupplierHomePage from "./pages/SupplierDashboard/SupplierHomePage";
import SupplierContactPage from "./pages/SupplierDashboard/SupplierContactPage";
import AdminLoginPage from "./pages/Login/AdminLoginPage";
import ActivateAccountUserPage from "./pages/Activate/ActivateAccountUserPage";
import ActivateAccountSupplierPage from "./pages/Activate/ActivateAccountSupplierPage";
import AdminHeader from "./common/header/AdminHeader/Header";
import AdminHomePage from "./pages/AdminDashboard/AdminHomePage";
import AdminAddUserAccountPage from "./pages/AdminDashboard/AdminAddUserAccountPage";
import AdminAddVendorAccountPage from "./pages/AdminDashboard/AdminAddVendorAccountPage";
import AddAdminAccountPage from "./pages/AdminDashboard/AddAdminAccountPage";
import ActivateAccountAdminPage from "./pages/Activate/ActivateAccountAdminPage";
import AddProductPage from "./pages/SupplierDashboard/AddProductPage";
import RecommendedDesignPage from "./pages/RecommendedDesign/RecommendedDesignPage";

export default function App() {
	const { loginDetails, setLoginDetails } = useContext(LoginContext);

	const history = useNavigate();

	const LoginValid = async () => {
		if (localStorage.getItem("userDataToken")) {
			const validToken = localStorage.getItem("userDataToken");
			const res = await fetch("/validuser", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: validToken,
				},
			});
			const fetchedData = await res.json();

			if (fetchedData.status === 401 || !fetchedData) {
				console.log("user not valid");
			} else {
				setLoginDetails(fetchedData);
				console.log("user verified");
				history("/home");
			}
		} else if (localStorage.getItem("adminDataToken")) {
			const validToken = localStorage.getItem("adminDataToken");
			const res = await fetch("/validadmin", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: validToken,
				},
			});
			const fetchedData = await res.json();

			if (fetchedData.status === 401 || !fetchedData) {
				console.log("user not valid");
			} else {
				setLoginDetails(fetchedData);
				console.log("user verified");
				history("/admin-dashboard");
			}
		} else if (localStorage.getItem("supplierDataToken")) {
			const validToken = localStorage.getItem("supplierDataToken");
			const res = await fetch("/validsupplier", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: validToken,
				},
			});
			const fetchedData = await res.json();

			if (fetchedData.status === 401 || !fetchedData) {
				console.log("user not valid");
			} else {
				setLoginDetails(fetchedData);
				console.log("user verified");
				history("/supplier-dashboard");
			}
		} else {
			setLoginDetails(false);
		}
	};

	useEffect(() => {
		LoginValid();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const { productItems } = Data;
	const { shopItems } = Sdata;

	const [CartItem, setCartItem] = useState([]);

	const addToCart = (product) => {
		const productExit = CartItem.find((item) => item.id === product.id);
		if (productExit) {
			setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)));
		} else {
			setCartItem([...CartItem, { ...product, qty: 1 }]);
		}
	};

	const decreaseQty = (product) => {
		const productExit = CartItem.find((item) => item.id === product.id);

		if (productExit.qty === 1) {
			setCartItem(CartItem.filter((item) => item.id !== product.id));
		} else {
			setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)));
		}
	};

	const removeItem = (product) => {
		const productExit = CartItem.find((item) => item.id === product.id);

		if (productExit.qty === product.qty) {
			setCartItem(CartItem.filter((item) => item.id !== product.id));
		} else {
			setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - product.qty } : item)));
		}
	};

	return (
		<>
			{loginDetails.validuser?.accounttype === "USER" ? <Header CartItem={CartItem} LoginValid={LoginValid} /> : <></>}
			{loginDetails.validuser?.accounttype === "ADMIN" ? <AdminHeader LoginValid={LoginValid} /> : <></>}
			{loginDetails.validuser?.accounttype === "SUPPLIER" ? <SupplierHeader LoginValid={LoginValid} /> : <></>}
			<Routes>
				<Route path={ROUTES.MASONRY} element={<Masonry addToCart={addToCart} shopItems={shopItems} />} />
				<Route path={ROUTES.ELECTRICAL} element={<Electrical addToCart={addToCart} shopItems={shopItems} />} />
				<Route path={ROUTES.STEEL} element={<Steel addToCart={addToCart} shopItems={shopItems} />} />
				<Route path={ROUTES.ROOFING} element={<Roofing addToCart={addToCart} shopItems={shopItems} />} />
				<Route path={ROUTES.CONCRETING} element={<Concreting addToCart={addToCart} shopItems={shopItems} />} />
				<Route path={ROUTES.FRAMING} element={<Framing addToCart={addToCart} shopItems={shopItems} />} />
				<Route path={ROUTES.FLOORING} element={<Flooring addToCart={addToCart} shopItems={shopItems} />} />
				<Route path={ROUTES.HOME} element={<Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />} />
				<Route path={ROUTES.CART} element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} removeItem={removeItem} />} />
				<Route path={ROUTES.LOGINUSER} element={<UserLoginPage LoginValid={LoginValid} />} />
				<Route path={ROUTES.RECOMMENDATION} element={<RecommendedDesignPage />} />
				<Route path={ROUTES.ACTIVATEUSER} element={<ActivateAccountUserPage />} />
				<Route path={ROUTES.TRACK} element={<TrackOrderPage />} />
				<Route path={ROUTES.CONTACT} element={<UserContactPage />} />
				<Route path={ROUTES.ALLCATEGORIES} element={<AllCategoriesDeals addToCart={addToCart} />} />
				<Route path={ROUTES.SEARCH} element={<SearchDeals addToCart={addToCart} />} />
				<Route path={ROUTES.INTERIOR} element={<InteriorDeals addToCart={addToCart} />} />
				<Route path={ROUTES.LOGINVENDOR} element={<VendorLoginPage LoginValid={LoginValid} />} />
				<Route path={ROUTES.SUPPLIERHOME} element={<SupplierHomePage />} />
				<Route path={ROUTES.ORDERS} element={<SupplierOrderPage />} />
				<Route path={ROUTES.ADDPRODUCT} element={<AddProductPage />} />
				<Route path={ROUTES.PAYMENTANDTRANSACTION} element={<PaymentAndTransactionPage />} />
				<Route path={ROUTES.SUPPLIERCONTACT} element={<SupplierContactPage />} />
				<Route path={ROUTES.ACTIVATEVENDOR} element={<ActivateAccountSupplierPage />} />
				<Route path={ROUTES.LOGINADMIN} element={<AdminLoginPage LoginValid={LoginValid} />} />{" "}
				<Route path={ROUTES.ACTIVATEADMIN} element={<ActivateAccountAdminPage />} />
				<Route path={ROUTES.ADMINHOME} element={<AdminHomePage />} />
				<Route path={ROUTES.ADDUSERACCOUNT} element={<AdminAddUserAccountPage />} />
				<Route path={ROUTES.ADDVENDORACCOUNT} element={<AdminAddVendorAccountPage />} />
				<Route path={ROUTES.ADDADMINACCOUNT} element={<AddAdminAccountPage />} />
			</Routes>
			{loginDetails ? <Footer /> : <></>}
		</>
	);
}
