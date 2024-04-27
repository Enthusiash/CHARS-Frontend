import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Col, Modal, Row, Typography } from "antd";
import InteriorDesignBella from "./InteriorDesignBella";
import InteriorDesignCara from "./InteriorDesignCara";
import InteriorDesignDani from "./InteriorDesignDani";
import InteriorDesignElla from "./InteriorDesignElla";
import InteriorDesignFreya from "./InteriorDesignFreya";
import InteriorDesignGreta from "./InteriorDesignGreta";

const { Title } = Typography;

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

const RecommendedCard = () => {
	const [bella, setBella] = useState(false);
	const [cara, setCara] = useState(false);
	const [dani, setDani] = useState(false);
	const [ella, setElla] = useState(false);
	const [freya, setFreya] = useState(false);
	const [greta, setGreta] = useState(false);

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};

	const onClose = () => {
		setBella(false);
		setCara(false);
		setDani(false);
		setElla(false);
		setFreya(false);
		setGreta(false);
	};

	return (
		<>
			<Slider {...settings}>
				<div className="box">
					<div className="product mtop">
						<div>
							<span>
								<img style={{ width: "300px", height: "300px" }} src="./images/recommendedDesign/1 Bella Model House.png" alt="" />
							</span>
						</div>
						<div className="product-details">
							<h3>Bella House Model</h3>
							<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
								<div className="rate">
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
								</div>
								<div className="price">
									<Button className="button" onClick={() => setBella(true)}>
										View
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="box">
					<div className="product mtop">
						<div>
							<span>
								<img style={{ width: "300px", height: "300px" }} src="./images/recommendedDesign/2 Cara Model House.jpg" alt="" />
							</span>
						</div>
						<div className="product-details">
							<h3>Cara House Model</h3>
							<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
								<div className="rate">
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
								</div>
								<div className="price">
									<Button className="button" onClick={() => setCara(true)}>
										View
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="box">
					<div className="product mtop">
						<div>
							<span>
								<img style={{ width: "300px", height: "300px" }} src="./images/recommendedDesign/3 Dani Model House.png" alt="" />
							</span>
						</div>
						<div className="product-details">
							<h3>Dani House Model</h3>
							<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
								<div className="rate">
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
								</div>
								<div className="price">
									<Button className="button" onClick={() => setDani(true)}>
										View
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="box">
					<div className="product mtop">
						<div>
							<span>
								<img style={{ width: "300px", height: "300px" }} src="./images/recommendedDesign/4 Ella Model House.jpg" alt="" />
							</span>
						</div>
						<div className="product-details">
							<h3>Ella House Model</h3>
							<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
								<div className="rate">
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
								</div>
								<div className="price">
									<Button className="button" onClick={() => setElla(true)}>
										View
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="box">
					<div className="product mtop">
						<div>
							<span>
								<img style={{ width: "300px", height: "300px" }} src="./images/recommendedDesign/5 Freya Model House.jpg" alt="" />
							</span>
						</div>
						<div className="product-details">
							<h3>Freya House Model</h3>
							<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
								<div className="rate">
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
								</div>
								<div className="price">
									<Button className="button" onClick={() => setFreya(true)}>
										View
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="box">
					<div className="product mtop">
						<div>
							<span>
								<img style={{ width: "300px", height: "300px" }} src="./images/recommendedDesign/6 Greta Model House.jpg" alt="" />
							</span>
						</div>
						<div className="product-details">
							<h3>Greta House Model</h3>
							<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
								<div className="rate">
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
								</div>
								<div className="price">
									<Button className="button" onClick={() => setGreta(true)}>
										View
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Slider>
			<div className="modals">
				<Modal key="1" title="Bela House Model" width={1000} open={bella} onCancel={() => onClose()} footer={[<></>]}>
					<Row>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<img
								style={{ width: "400px", height: "450px", border: "1px black solid" }}
								src="./images/recommendedDesign/1 Bella Model House.png"
								alt=""
							/>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Description
							</Title>
							<hr />
							<br />
							<Title level={5}>Floor Area: 53 sqm.</Title>
							<Title level={5}>Lot Area: 88 sqm.</Title>
							<br />
							<ul>
								<li>2-Storey Single Firewall</li>
								<li>2 Bedrooms</li>
								<li>Living Area</li>
								<li>Dining Area</li>
								<li>Kitchen</li>
								<li>2 Toilets and Bathroom</li>
							</ul>
							<br />
							<Title level={5}>Begin in Bella</Title>
							<p>
								Bella Model House is perfect for people aiming to start owning a piece of a Camella community. With two bedrooms, two bathrooms, and a
								provision for carport, Bella has just enough space to cover your essential and favorite home basics.
							</p>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Floor Plan
							</Title>
							<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
								<Col xs={{ span: 6 }} md={{ span: 6 }}>
									<img style={{ height: "200px", width: "120px" }} src="./bella-floor-plan/Bella-GroundFloor.png" alt="" />
								</Col>
								<Col xs={{ span: 6 }} md={{ span: 6 }}>
									<img style={{ height: "200px", width: "120px" }} src="./bella-floor-plan/Bella-SecondFloor.png" alt="" />
								</Col>
							</div>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Recommender
							</Title>
							<InteriorDesignBella />
						</Col>
					</Row>
				</Modal>

				<Modal key="2" title="Cara House Model" width={1000} open={cara} onCancel={() => onClose()} footer={[<></>]}>
					<Row>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<img
								style={{ width: "400px", height: "460px", border: "1px black solid" }}
								src="./images/recommendedDesign/2 Cara Model House.jpg"
								alt=""
							/>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Description
							</Title>
							<hr />
							<br />
							<Title level={5}>Floor Area: 66 sqm.</Title>
							<Title level={5}>Lot Area: 88 sqm.</Title>
							<br />
							<ul>
								<li>2-Storey Single Firewall</li>
								<li>3 Bedrooms</li>
								<li>Living Area</li>
								<li>Dining Area</li>
								<li>Kitchen</li>
								<li>2 Toilets and Bathroom</li>
								<li>Provision for Balcony & Carport</li>
							</ul>
							<br />
							<Title level={5}>Cozy up in Cara</Title>
							<p>
								Cara is Camella’s family starter house offering, with three bedrooms, two toilet-and-baths, and a provision for a single-car carport and
								a balcony. Start smart and surround your family with your favorite leisure activities and bring them to your beautiful first home here
								in Camella.
							</p>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Floor Plan
							</Title>
							<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
								<Col xs={{ span: 6 }} md={{ span: 6 }}>
									<img style={{ height: "200px", width: "120px" }} src="./bella-floor-plan/Cara-GroundFloor.png" alt="" />
								</Col>
								<Col xs={{ span: 6 }} md={{ span: 6 }}>
									<img style={{ height: "200px", width: "120px" }} src="./bella-floor-plan/Cara-SecondFloor.png" alt="" />
								</Col>
							</div>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Recommender
							</Title>
							<InteriorDesignCara />
						</Col>
					</Row>
				</Modal>

				<Modal key="3" title="Dani House Model" width={1000} open={dani} onCancel={() => onClose()} footer={[<></>]}>
					<Row>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<img
								style={{ width: "430px", height: "540px", border: "1px black solid" }}
								src="./images/recommendedDesign/3 Dani Model House.png"
								alt=""
							/>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Description
							</Title>
							<hr />
							<br />
							<Title level={5}>Floor Area: 83 sqm.</Title>
							<Title level={5}>Lot Area: 110 sqm.</Title>
							<br />
							<ul>
								<li>2-Storey Single Firewall</li>
								<li>2 Bedrooms</li>
								<li>1 Master Bedroom</li>
								<li>1 Extra Room</li>
								<li>Living Area</li>
								<li>Dining Area</li>
								<li>Kitchen</li>
								<li>2 Toilets and Bathroom</li>
								<li>Provision for Balcony & Carport</li>
							</ul>
							<br />
							<Title level={5}>Delight in Dani</Title>
							<p>
								Dani is the perfect home for our moderately-sized families. This house wastes no space and fits four bedrooms to give every single one
								of your children their own favorite sanctuary. Dani also has three toilet-and-baths, and a provision for a balcony and a carport within
								its generous area to complete its indulging package.
							</p>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Floor Plan
							</Title>
							<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
								<Col xs={{ span: 6 }} md={{ span: 6 }}>
									<img style={{ height: "200px", width: "120px" }} src="./bella-floor-plan/Dani-GroundFloor.png" alt="" />
								</Col>
								<Col xs={{ span: 6 }} md={{ span: 6 }}>
									<img style={{ height: "200px", width: "120px" }} src="./bella-floor-plan/Dani-SecondFloor.png" alt="" />
								</Col>
							</div>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Recommender
							</Title>
							<InteriorDesignDani />
						</Col>
					</Row>
				</Modal>

				<Modal key="4" title="Ella House Model" width={1000} open={ella} onCancel={() => onClose()} footer={[<></>]}>
					<Row>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<img
								style={{ width: "450px", height: "600px", border: "1px black solid" }}
								src="./images/recommendedDesign/4 Ella Model House.jpg"
								alt=""
							/>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Description
							</Title>
							<hr />
							<br />
							<Title level={5}>Floor Area: 100 sqm.</Title>
							<Title level={5}>Lot Area: 121 sqm.</Title>
							<br />
							<ul>
								<li>2-Storey Single Firewall</li>
								<li>2 Bedrooms</li>
								<li>1 Master Bedroom</li>
								<li>1 Extra Room</li>
								<li>Living Area</li>
								<li>Dining Area</li>
								<li>Kitchen</li>
								<li>2 Toilets and Baths</li>
								<li>1 Master Toilet and Bath</li>
								<li>Provision for Balcony & Carport</li>
							</ul>
							<br />
							<Title level={5}>Unwind in Ella</Title>
							<p>
								Ella does something different with its space. It has a big bedroom next to a bath and toilet on the house’s ground floor, making
								mobility for engaging in favorite pastimes easy for the elder members of your family. This also frees up more area for the bedrooms
								upstairs for a total of five rooms. This home gets even more inventive by allocating a provision for a carport and a balcony to complete
								the grand package. Ella is a perfect home option for bigger families with elderly.
							</p>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Floor Plan
							</Title>
							<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
								<Col xs={{ span: 6 }} md={{ span: 6 }}>
									<img style={{ height: "200px", width: "120px" }} src="./bella-floor-plan/Ella-GroundFloor.png" alt="" />
								</Col>
								<Col xs={{ span: 6 }} md={{ span: 6 }}>
									<img style={{ height: "200px", width: "120px" }} src="./bella-floor-plan/Ella_SecondFloor.png" alt="" />
								</Col>
							</div>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Recommender
							</Title>
							<InteriorDesignElla />
						</Col>
					</Row>
				</Modal>

				<Modal key="5" title="Freya House Model" width={1000} open={freya} onCancel={() => onClose()} footer={[<></>]}>
					<Row>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<img
								style={{ width: "465px", height: "620px", border: "1px black solid" }}
								src="./images/recommendedDesign/5 Freya Model House.jpg"
								alt=""
							/>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Description
							</Title>
							<hr />
							<br />
							<Title level={5}>Floor Area: 142 sqm.</Title>
							<Title level={5}>Lot Area: 132 sqm.</Title>
							<br />
							<ul>
								<li>2-Storey Single Firewall</li>
								<li>3 Bedrooms</li>
								<li>1 Master Bedroom</li>
								<li>1 Extra Room</li>
								<li>Family Area</li>
								<li>Living Area</li>
								<li>Dining Area</li>
								<li>Kitchen</li>
								<li>2 Toilets and Baths</li>
								<li>1 Master Toilet and Bath</li>
								<li>Porch</li>
								<li>Balcony</li>
								<li>Carport</li>
							</ul>
							<br />
							<Title level={5}>Laze in Freya</Title>
							<p>
								Freya stands out for its flexible hobby room that you could transform into an office area, a passion corner, or a gallery for your
								favorite collectibles. This is on top of its five spacious bedrooms, three large toilet-and-baths, and a provision for a carport and a
								balcony. With all these inclusions, Freya has more than enough space for your expanding family.
							</p>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Floor Plan
							</Title>
							<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
								<Col xs={{ span: 6 }} md={{ span: 6 }}>
									<img style={{ height: "200px", width: "120px" }} src="./bella-floor-plan/Freya-GroundFloor.png" alt="" />
								</Col>
								<Col xs={{ span: 6 }} md={{ span: 6 }}>
									<img style={{ height: "200px", width: "120px" }} src="./bella-floor-plan/Freya-SecondFloor.png" alt="" />
								</Col>
							</div>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Recommender
							</Title>
							<InteriorDesignFreya />
						</Col>
					</Row>
				</Modal>

				<Modal key="6" title="Greta House Model" width={1000} open={greta} onCancel={() => onClose()} footer={[<></>]}>
					<Row>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<img
								style={{ width: "465px", height: "620px", border: "1px black solid" }}
								src="./images/recommendedDesign/6 Greta Model House.jpg"
								alt=""
							/>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Description
							</Title>
							<hr />
							<br />
							<Title level={5}>Floor Area: 166 sqm.</Title>
							<Title level={5}>Lot Area: 143 sqm.</Title>
							<br />
							<ul>
								<li>2-Storey Single Firewall</li>
								<li>3 Bedrooms</li>
								<li>1 Master Bedroom</li>
								<li>1 Extra Room</li>
								<li>Living Area</li>
								<li>Dining Area</li>
								<li>Kitchen</li>
								<li>2 Toilets and Baths</li>
								<li>1 Master Toilet and Bath</li>
								<li>Porch</li>
								<li>Balcony</li>
								<li>2-Carports</li>
							</ul>
							<br />
							<Title level={5}>Relax in Greta</Title>
							<p>
								Greta is Camella’s most spacious house offering yet, with five spacious bedrooms, three neat toilet-and-baths, a wide two-car carport
								and a refreshing balcony. Its master’s bedroom is equipped with its own bathtub and a provision for a walk-in closet to give you a
								luxurious and better living experience. Every moment is great in Greta, where you can find your favorite features for a smart and
								healthy home.
							</p>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Floor Plan
							</Title>
							<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
								<Col xs={{ span: 6 }} md={{ span: 6 }}>
									<img style={{ height: "200px", width: "120px" }} src="./bella-floor-plan/Greta-GroundFloor.png" alt="" />
								</Col>
								<Col xs={{ span: 6 }} md={{ span: 6 }}>
									<img style={{ height: "200px", width: "120px" }} src="./bella-floor-plan/Greta-SecondFloor.png" alt="" />
								</Col>
							</div>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Title level={4} style={{ color: "red" }}>
								Recommender
							</Title>
							<InteriorDesignGreta />
						</Col>
					</Row>
				</Modal>
			</div>
		</>
	);
};

export default RecommendedCard;
