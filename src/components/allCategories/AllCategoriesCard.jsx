import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LoginContext } from "../../context/Context";

const SampleNextArrow = (props) => {
	const { onClick } = props;
	return (
		<div className="control-btn" onClick={onClick}>
			<button className="next">
				<i className="fa fa-long-arrow-alt-right"></i>
			</button>
		</div>
	);
};
const SamplePrevArrow = (props) => {
	const { onClick } = props;
	return (
		<div className="control-btn" onClick={onClick}>
			<button className="prev">
				<i className="fa fa-long-arrow-alt-left"></i>
			</button>
		</div>
	);
};
const AllCategoriesCard = ({ addToCart }) => {
	const [productItems, setProductItems] = useState([]);
	const { loginDetails } = useContext(LoginContext);

	const getProduct = async () => {
		const res = await fetch("/main/sub-product", {
			method: "GET",
			headers: {
				Content: "application/json",
			},
		});
		const data = await res.json();
		setProductItems(data);
	};

	useEffect(() => {
		getProduct();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		rows: 5,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};

	return (
		<>
			<Slider {...settings}>
				{productItems.map((productItems) => {
					return (
						<div className="box">
							<div className="product mtop">
								<div className="img">
									<span className="discount">{productItems.discount}% Off</span>
									<img className="img-size" src={`../../../../uploads/${productItems.imgpath}`} alt="" />
								</div>
								<p hidden>{(productItems.userId = loginDetails?.validuser.email)}</p>
								<p hidden>
									{
										(productItems.username = `${loginDetails.validuser?.firstname} ${loginDetails.validuser?.middlename} ${loginDetails.validuser?.lastname}`)
									}
								</p>
								<p hidden>{(productItems.address = `${loginDetails?.validuser.streetaddress}, ${loginDetails?.validuser.province}`)}</p>
								<div className="product-details">
									<h3>{productItems.name}</h3>
									<h5>Description: {productItems.description}</h5>
									<div className="rate">
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
									</div>
									<div className="price">
										<h4>Php {productItems.price}.00 </h4>
										{/* step : 3  
                     if hami le button ma click garryo bahne 
                    */}
										<button onClick={() => addToCart(productItems)}>
											<i className="fa fa-plus"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</Slider>
		</>
	);
};

export default AllCategoriesCard;
