import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.min.css";
import { Button, message, Modal } from "antd";
import "./style.css";
import { LoginContext } from "../../context/Context";

const Cart = ({ CartItem, addToCart, decreaseQty, removeItem }) => {
	const [show, setShow] = useState(false);
	const { loginDetails } = useContext(LoginContext);
	// Stpe: 7   calucate total of items
	const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0);

	const history = useNavigate();

	const onAddOrder = async (order) => {
		setShow(false);
		message.success("Ordered Successfully", 5000);
		setTimeout(() => {
			window.location.reload();
			history("/home");
		}, 5000);
		await fetch("/main/add-order", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(order, totalPrice),
		});
	};

	return (
		<>
			<section className="cart-items">
				<div className="container d_flex">
					{/* if hamro cart ma kunai pani item xaina bhane no diplay */}

					<div className="cart-details">
						{CartItem.length === 0 && <h1 className="no-items product">No Items are add in Cart</h1>}

						{/* yasma hami le cart item lai display garaaxa */}
						{CartItem.map((item) => {
							const productQty = item.price * item.qty;

							return (
								<div className="cart-list product d_flex" key={item.id}>
									<div className="img">
										<img style={{ width: "200px", height: "200px", marginRight: "50px" }} src={`../../../../uploads/${item.imgpath}`} alt="" />
									</div>
									<div className="cart-details" style={{ marginLeft: "100px" }}>
										<h3>{item.name}</h3>
										<h4>
											Php {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00 * {item.qty}
											<span>Php {productQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00</span>
											<p hidden>{(item.ptotalprice = productQty)}</p>
										</h4>
										<br />
										<div className="supplier_details">
											<p>{item.supplier}</p>
											<p> {item.address} </p>
										</div>
									</div>
									<div className="cart-items-function">
										<div className="removeCart">
											<button className="removeCart" onClick={() => removeItem(item)}>
												<i className="fa-solid fa-xmark"></i>
											</button>
										</div>
										{/* stpe: 5 
                    product ko qty lai inc ra des garne
                    */}
										<div className="cartControl d_flex">
											<button className="incCart" onClick={() => addToCart(item)}>
												<i className="fa-solid fa-plus"></i>
											</button>
											<button className="desCart" onClick={() => decreaseQty(item)}>
												<i className="fa-solid fa-minus"></i>
											</button>
										</div>
									</div>

									<div className="cart-item-price"></div>
								</div>
							);
						})}
					</div>

					<div className="cart-total product">
						<h2>Cart Summary</h2>
						<div className=" d_flex">
							<h4>Total Price :</h4>
							<h3>Php {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00</h3>
						</div>
						<Button
							type="primary"
							style={{ width: "100%", height: "60px" }}
							onClick={() => {
								CartItem.length > 0 ? setShow(true) : message.warning("No Item(s) on Cart");
							}}
						>
							CHECKOUT
						</Button>
					</div>
				</div>
				<div className="modals">
					<Modal
						key="1"
						title="CHECKOUT DETAILS"
						width={1300}
						open={show}
						onCancel={() => {
							setShow(false);
						}}
						footer={[
							<Button
								key="cancel"
								shape="round"
								onClick={() => {
									setShow(false);
								}}
							>
								Cancel
							</Button>,
							<Button
								key="proceed"
								type="primary"
								shape="round"
								onClick={() => {
									onAddOrder(CartItem);
								}}
							>
								Proceed
							</Button>,
						]}
					>
						<div className="container d_flex">
							{/* if hamro cart ma kunai pani item xaina bhane no diplay */}

							<div className="cart-details">
								{/* yasma hami le cart item lai display garaaxa */}
								{CartItem.map((item) => {
									const productQty = item.price * item.qty;

									return (
										<div className="cart-list product d_flex" key={item.id}>
											<div className="img">
												<img style={{ width: "200px", height: "200px" }} src={`../../../../uploads/${item.imgpath}`} alt="" />
											</div>
											<div className="cart-details" style={{ marginLeft: "20px" }}>
												<h3>{item.name}</h3>
												<p hidden>{(item.totalPrice = totalPrice)}</p>
												<h4>
													Php {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00 * {item.qty}
													<span style={{ marginLeft: "100px" }}>Php {productQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00</span>
													<p hidden>{(item.ptotalprice = productQty)}</p>
												</h4>
												<br />
												<div className="supplier_details">
													<p>{item.supplier}</p>
													<p> {item.address} </p>
												</div>
											</div>
										</div>
									);
								})}
							</div>
							<div className="cart-total product" style={{ width: "50%" }}>
								<h2>Checkout Summary</h2>
								<div className=" d_flex">
									<h4>Total Price :</h4>
									<h3>Php {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00</h3>
								</div>
								<div className=" d_flex">
									<h4>Receiver: </h4>
									<h3>{`${loginDetails.validuser?.firstname} ${loginDetails.validuser?.middlename} ${loginDetails.validuser?.lastname}`}</h3>
								</div>
								<div className=" d_flex">
									<h4>Delivery Address: </h4>
									<h3>{`${loginDetails.validuser?.streetaddress}, ${loginDetails.validuser?.province}`}</h3>
								</div>
								<div className=" d_flex">
									<h4>Payment Medhod: </h4>
									<h3>Cash on Delivery</h3>
								</div>
							</div>
						</div>
					</Modal>
				</div>
			</section>
		</>
	);
};

export default Cart;
