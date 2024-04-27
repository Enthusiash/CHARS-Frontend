import React, { useState, useContext } from "react";
import "antd/dist/antd.min.css";
import "./Home.css";
import { Button, Form, Input, message, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../../context/SearchContext";

export const InteriorValue = [
	{
		name: "Bedroom",
		value: "Bedroom",
		size: "30sqm",
	},
	{
		name: "Toilet/bath 1st floor",
		value: "Toilet/bath 1st floor",
		size: "20sqm",
	},
	{
		name: "Toilet/bath 2nd floor",
		value: "Toilet/bath 2nd floor",
		size: "20sqm",
	},
	{
		name: "Kitchen",
		value: "Kitchen",
		size: "25sqm",
	},
	{
		name: "Living Area",
		value: "Living Area",
		size: "30sqm",
	},
	{
		name: "Dining Area",
		value: "Dining Area",
		size: "25sqm",
	},
];

const InteriorDesignGreta = () => {
	const [form] = Form.useForm();
	const [sqm, setSqm] = useState();
	// eslint-disable-next-line no-unused-vars
	const { productItems, setProductItems } = useContext(SearchContext);

	const history = useNavigate();

	const handleChange = (value) => {
		const selected = InteriorValue.find((design) => design.value === value);
		setSqm(selected?.size);
		console.log(selected);
	};

	const onFinish = async (values) => {
		const res = await fetch(`/main/design-product?search=${values.category}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		console.log(data);
		if (data.status === 200) {
			setProductItems(data.body);
			history("/interior");
		}
	};
	const onFinishFailed = (error) => {
		message.error(error);
	};
	return (
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
			<div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
				<Form.Item name="category">
					<Select style={{ width: "300px" }} placeholder="Please Select" onChange={handleChange}>
						{InteriorValue.map((value, index) => (
							<Select.Option key={index} value={value.name}>
								{value.label}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item name="size">
					<Input placeholder={sqm} style={{ height: "33px" }} disabled />
				</Form.Item>
				<Button type="primary" htmlType="submit">
					Find
				</Button>
			</div>
		</Form>
	);
};

export default InteriorDesignGreta;
