import React, { useState } from "react";
import Sdata from "./Sdata";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Input, Modal, message, Form, Row, Col, Select, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { HouseDesginData, InteriorDesign } from "./Sdata";

const SlideCard = () => {
	const [modal, setModal] = useState(false);
	const [form] = Form.useForm();

	const onClose = () => {
		setModal(false);
		form.resetFields();
	};

	const onFinish = async (values) => {
		const newData = new FormData();
		newData.append("name", values.name);
		newData.append("photo", values.photo.file.originFileObj);
		newData.append("category", values.category);
		newData.append("size", values.size);

		const data = await fetch("/main/add-recommendation", {
			method: "POST",
			body: newData,
		});

		const res = await data.json();
		if (res.status === 201) {
			message.success("Recommendation Added");
			onClose();
			form.resetFields();
		} else {
			message.error(res.error);
		}
	};

	const onFinishFailed = (error) => {
		console.log(error);
	};

	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		appendDots: (dots) => {
			return <ul style={{ margin: "0px" }}>{dots}</ul>;
		},
	};

	const imgprops = {
		beforeUpload: (file) => {
			const isIMG = file.type.startsWith("image");

			if (!isIMG) {
				message.error(`${file.name} is not an image`);
			}

			return isIMG || Upload.LIST_IGNORE;
		},
		onChange: (info) => {
			console.log(info.fileList);
		},
	};

	const onPreview = async (file) => {
		let src = file.url;

		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);

				reader.onload = () => resolve(reader.result);
			});
		}

		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};

	return (
		<>
			<Slider {...settings}>
				{Sdata.map((value, index) => {
					return (
						<>
							<div className="box d_flex top" key={index}>
								<div className="left">
									<h1>{value.title}</h1>
									<p>{value.desc}</p>
									<button className="btn-primary" style={{ cursor: "pointer" }} onClick={() => setModal(true)}>
										Add Recommendation
									</button>
								</div>
								<div className="right">
									<img src={value.cover} alt="" />
								</div>
							</div>
						</>
					);
				})}
			</Slider>
			<Modal
				key="1"
				title="ADD RECOMMENDATION"
				width={600}
				open={modal}
				onCancel={() => {
					onClose();
				}}
				footer={[<></>]}
			>
				<Form
					form={form}
					labelCol={{
						span: 8,
					}}
					layout="horizontal"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					style={{
						width: "100%",
						maxHeight: "100vh",
					}}
				>
					<Row>
						<Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
						<Col xs={{ span: 24 }} md={{ span: 16 }}>
							<Row gutter={12}>
								<Col xs={{ span: 24 }} md={{ span: 24 }}>
									<Form.Item
										name="name"
										labelCol={{
											span: 24,
										}}
										wrapperCol={{
											span: 24,
										}}
										hasFeedback
										rules={[
											{
												required: true,
												message: "Please select your house design!",
											},
										]}
									>
										<Select placeholder="House Design">
											{HouseDesginData.map((value, index) => (
												<Select.Option key={index} value={value.name}>
													{value.label}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={12}>
								<Col xs={{ span: 24 }} md={{ span: 24 }}>
									<Form.Item
										name="category"
										labelCol={{
											span: 24,
										}}
										wrapperCol={{
											span: 24,
										}}
										hasFeedback
										rules={[
											{
												required: true,
												message: "Please select your interior design!",
											},
										]}
									>
										<Select placeholder="Interior Design">
											{InteriorDesign.map((value, index) => (
												<Select.Option key={index} value={value.name}>
													{value.label}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={12}>
								<Col xs={{ span: 24 }} md={{ span: 24 }} layout="vertical">
									<Form.Item
										name="size"
										labelCol={{
											span: 24,
										}}
										wrapperCol={{
											span: 24,
										}}
										hasFeedback
										rules={[
											{
												required: true,
												message: "Please enter recommended size",
											},
											{
												pattern: /^[0-9]*$/,
												message: "Price should be a number",
											},
										]}
									>
										<Input placeholder="Recommended Size" />
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={12}>
								<Col xs={{ span: 24 }} md={{ span: 24 }}>
									<Form.Item
										label="Recommended Materials"
										name="photo"
										labelCol={{
											span: 24,
											//offset: 2
										}}
										wrapperCol={{
											span: 24,
										}}
										hasFeedback
										rules={[
											{
												required: true,
												message: "Please upload an image",
											},
										]}
									>
										<Upload {...imgprops} listType="picture-card" maxCount={1} onPreview={onPreview}>
											<div>
												<PlusOutlined />
												<div style={{ marginTop: 8 }}>Upload</div>
											</div>
										</Upload>
									</Form.Item>
								</Col>
							</Row>
							<Button type="primary" htmlType="submit">
								ADD RECOMMENDATION
							</Button>
						</Col>

						<Col xs={{ span: 24 }} md={{ span: 24 }}></Col>
						<Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
					</Row>
				</Form>
			</Modal>
		</>
	);
};

export default SlideCard;
