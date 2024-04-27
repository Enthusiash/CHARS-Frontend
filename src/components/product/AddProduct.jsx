import React, { useContext, useState, useRef, useEffect } from "react";
import "antd/dist/antd.min.css";
import { Input, Space, Table, Modal, message, Form, Row, Col, Image, Select, Upload, Button, Typography } from "antd";
import { SearchOutlined, PlusCircleOutlined, PlusOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { LoginContext } from "../../context/Context";
import { CategoryData, SubCategoryData, InteriorDesign } from "./ProductData";
import Highlighter from "react-highlight-words";
import styled from "styled-components";

const { Text } = Typography;

const AddProduct = () => {
	const [viewData, setViewData] = useState(null);
	const [updateData, setUpdateData] = useState(null);
	const [isView, setIsView] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [form] = Form.useForm();
	const [data, setData] = useState([]);
	const [modal, setModal] = useState(false);
	const [discounted, setDiscounted] = useState(true);
	const [searchedColumn, setSearchedColumn] = useState("");
	const [searchText, setSearchText] = useState("");
	const [loading, setLoading] = useState(false);
	const searchInput = useRef(null);
	// eslint-disable-next-line no-unused-vars
	const [pagination, setPagination] = useState({
		defaultCurrent: 1,
		pageSize: 10,
		total: data[0]?.body.length,
	});
	const { loginDetails } = useContext(LoginContext);

	const id = `${loginDetails.validuser?._id}`;
	const suppliername = `${loginDetails.validuser?.businessname}`;
	const supplieraddress = `${loginDetails.validuser?.streetaddress} ${loginDetails.validuser?.province}`;
	const initialValues = {
		category: updateData?.category,
		description: updateData?.description,
		discount: updateData?.discount,
		interior: updateData?.interior,
		name: updateData?.name,
		price: updateData?.price,
		quantity: updateData?.quantity,
		subcategory: updateData?.subcategory,
	};

	const ViewRecord = (record) => {
		setViewData(record);
		setIsView(true);
	};

	useEffect(() => {
		getProduct();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// API CALLS
	const getProduct = async () => {
		setLoading(true);
		const res = await fetch(`/main/get-product/${loginDetails.validuser?._id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const dataComp = await res.json();
		setData([dataComp]);
		setLoading(false);
	};

	const onFinish = async (values) => {
		const newData = new FormData();
		newData.append("discount", values.discount);
		newData.append("photo", values.photo.file.originFileObj);
		newData.append("name", values.name);
		newData.append("description", values.description);
		newData.append("interior", values.interior);
		newData.append("supplier", values.supplier);
		newData.append("supplierid", values.supplierid);
		newData.append("price", values.price);
		newData.append("quantity", values.quantity);
		newData.append("address", values.address);
		newData.append("category", values.category);
		newData.append("subcategory", values.subcategory);

		const data = await fetch("/main/add-product", {
			method: "POST",
			body: newData,
		});

		const res = await data.json();
		if (res.status === 201) {
			message.success("Product Added");
			onClose();
			getProduct();
			form.resetFields();
		} else {
			message.error(res.error);
		}
	};

	const onFinishFailed = (error) => {
		message.error(error);
	};

	const onFinishUpdate = async (values) => {
		const data = await fetch(`/main/update-product/${updateData?._id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		});
		const res = await data.json();
		if (res.status === 201) {
			message.success("Updated Successfully");
			onUpdateClose();
			getProduct();
			form.resetFields();
		} else {
			message.error(res.error);
		}
	};

	const onFinishUpdateFailed = (errors) => {
		message.error(errors);
	};

	console.log(initialValues);

	const handleSubCatChange = (value) => {
		if (value === "Discounted Items" || value === "Flash Deals") {
			setDiscounted(false);
		} else if (value === undefined || value === "") {
			setDiscounted(false);
		} else {
			setDiscounted(true);
		}
	};

	// TABLE SETTINGS
	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText("");
	};

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div
				style={{
					padding: 8,
				}}
			>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
						marginBottom: 8,
						display: "block",
					}}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{
							width: 90,
						}}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{
							width: 90,
						}}
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({
								closeDropdown: false,
							});
							setSearchText(selectedKeys[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{
					color: filtered ? "#1890ff" : undefined,
				}}
			/>
		),
		onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: "#ffc069",
						padding: 0,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			),
	});
	const UpdateRecord = (record) => {
		setTimeout(() => {
			form.resetFields();
		}, 100);

		setUpdateData(record);
		setIsEdit(true);
	};
	const onUpdateClose = () => {
		form.resetFields();
		setTimeout(() => {
			setIsEdit(false);
		}, 100);
	};
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			width: "5%",
			...getColumnSearchProps("id"),
		},
		{
			title: "Product Name",
			dataIndex: "name",
			key: "name",
			width: "15%",
			...getColumnSearchProps("name"),
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
			width: "10%",
		},
		{
			title: "Quantity",
			dataIndex: "quantity",
			key: "quantity",
			width: "10%",
		},
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
			width: "10%",
		},
		{
			title: "Sub-Category",
			dataIndex: "subcategory",
			key: "subcategory",
			width: "10%",
		},
		{
			title: (
				<>
					<Button type="primary" shape="round" icon={<PlusCircleOutlined />} onClick={() => setModal(true)}>
						ADD PRODUCT
					</Button>
				</>
			),
			dataIndex: "",
			key: "x",
			width: "10%",
			render: (record) => (
				<>
					<div style={{ display: "flex" }}>
						<Button
							style={{ backgroundColor: "teal", color: "white" }}
							shape="round"
							icon={<EyeOutlined />}
							onClick={() => {
								ViewRecord(record);
							}}
						>
							View
						</Button>
						<Button
							style={{ backgroundColor: "white", color: "teal" }}
							shape="round"
							icon={<EditOutlined />}
							onClick={() => {
								UpdateRecord(record);
							}}
						>
							Edit
						</Button>
					</div>
				</>
			),
		},
	];

	// END TABLE SETUP

	// FORM-Modal SETUP

	const onClose = () => {
		setModal(false);
		form.resetFields();
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
		<Section>
			<div className="table">
				<Table columns={columns} dataSource={data[0]?.body} pagination={pagination} loading={loading} />
			</div>
			<div className="modal">
				<Modal
					key="1"
					title="ADD PRODUCT"
					width={600}
					height="100vh"
					open={modal}
					onCancel={() => {
						onClose();
					}}
					footer={[<></>]}
				>
					<Form
						form={form}
						initialValues={{ supplierid: id, address: supplieraddress, supplier: suppliername }}
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
							<Form.Item name="supplier">
								<Input hidden defaultValue={suppliername} />
							</Form.Item>
							<Form.Item name="supplierid">
								<Input hidden defaultValue={id} />
							</Form.Item>
							<Form.Item name="address">
								<Input hidden defaultValue={supplieraddress} />
							</Form.Item>
							<Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
							<Col xs={{ span: 24 }} md={{ span: 16 }}>
								<Row gutter={12}>
									<Col xs={{ span: 24 }} md={{ span: 24 }} layout="vertical">
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
													message: "Please enter product name",
												},
											]}
										>
											<Input placeholder="Product Name" />
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={12}>
									<Col xs={{ span: 24 }} md={{ span: 24 }} layout="vertical">
										<Form.Item
											name="description"
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
													message: "Please enter product description",
												},
											]}
										>
											<Input placeholder="Product Description" />
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={12}>
									<Col xs={{ span: 24 }} md={{ span: 12 }} layout="vertical">
										<Form.Item
											name="price"
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
													message: "Please enter price",
												},
												{
													pattern: /^[0-9]*$/,
													message: "Price should be a number",
												},
											]}
										>
											<Input placeholder="Price" />
										</Form.Item>
									</Col>

									<Col xs={{ span: 24 }} md={{ span: 12 }} layout="vertical">
										<Form.Item
											name="quantity"
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
													message: "Please enter quantity",
												},
												{
													pattern: /^[0-9]*$/,
													message: "Quantity should be a number",
												},
											]}
										>
											<Input placeholder="Quantity" />
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={12}>
									<Col xs={{ span: 24 }} md={{ span: 8 }}>
										<Form.Item
											label="Photo"
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
								<Row gutter={12}>
									<Col xs={{ span: 24 }} md={{ span: 24 }}>
										<Form.Item
											name="interior"
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
													message: "Please select your recommendation!",
												},
											]}
										>
											<Select placeholder="Recommend for...">
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
													message: "Please select your category!",
												},
											]}
										>
											<Select placeholder="Category">
												{CategoryData.map((value, index) => (
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
											name="subcategory"
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
													message: "Please select your sub-category!",
												},
											]}
										>
											<Select placeholder="Sub-Category" onChange={handleSubCatChange}>
												{SubCategoryData.map((value, index) => (
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
											name="discount"
											labelCol={{
												span: 24,
											}}
											wrapperCol={{
												span: 24,
											}}
											hasFeedback
											rules={[
												{
													pattern: /^[0-9]*$/,
													message: "Discount should be a number",
												},
											]}
										>
											<Input placeholder="Discount(%)" hidden={discounted} />
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={12}>
									<Col xs={{ span: 24 }} md={{ span: 24 }} layout="vertical">
										<Button type="primary" htmlType="submit">
											ADD PRODUCT
										</Button>
									</Col>
								</Row>
							</Col>
							<Col xs={{ span: 24 }} md={{ span: 24 }}></Col>
							<Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
						</Row>
					</Form>
				</Modal>
			</div>

			<div className="modal">
				<Modal
					title="PRODUCT DETAILS"
					width={600}
					open={isView}
					onCancel={() => {
						setIsView(false);
					}}
					footer={[
						<Button
							key="cancel23"
							onClick={() => {
								setIsView(false);
							}}
						>
							Cancel
						</Button>,
					]}
				>
					<Row>
						<Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
						<Col xs={{ span: 24 }} md={{ span: 16 }}>
							<Row gutter={12}>
								<Col xs={{ span: 24 }} md={{ span: 24 }}>
									<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
										<Image
											style={{ border: "1px solid black" }}
											height={300}
											weight={300}
											src={`../../../../uploads/${viewData?.imgpath}`}
											alt="view"
										/>
									</div>
								</Col>
							</Row>
							<Row gutter={12}>
								<Col xs={{ span: 24 }} md={{ span: 24 }}>
									<br></br>
									<Text strong>Product Name:</Text>
									<Input style={{ marginBottom: "8px" }} value={viewData?.name} disabled />
								</Col>
								<Col xs={{ span: 24 }} md={{ span: 24 }}>
									<br></br>
									<Text strong>Product Description:</Text>
									<Input style={{ marginBottom: "8px" }} value={viewData?.description} disabled />
								</Col>
								<Col xs={{ span: 24 }} md={{ span: 24 }}>
									<br></br>
									<Text strong>Category:</Text>
									<Input style={{ marginBottom: "8px" }} value={viewData?.category} disabled />
								</Col>
								<Col xs={{ span: 24 }} md={{ span: 24 }}>
									<br></br>
									<Text strong>Sub-Category:</Text>
									<Input style={{ marginBottom: "8px" }} value={viewData?.subcategory} disabled />
								</Col>
								<Col xs={{ span: 24 }} md={{ span: 24 }}>
									<br></br>
									<Text strong>Price:</Text>
									<Input style={{ marginBottom: "8px" }} value={viewData?.price} disabled />
								</Col>
								<Col xs={{ span: 24 }} md={{ span: 24 }}>
									<br></br>
									<Text strong>Quantity:</Text>
									<Input style={{ marginBottom: "8px" }} value={viewData?.quantity} disabled />
								</Col>
							</Row>
						</Col>
					</Row>
				</Modal>

				<Modal
					title="UPDATE PRODUCT DETAILS"
					width={600}
					open={isEdit}
					onCancel={() => {
						onUpdateClose();
					}}
					footer={[
						<Button
							key="cancel234"
							onClick={() => {
								onUpdateClose();
							}}
						>
							Cancel
						</Button>,
					]}
				>
					{isEdit ? (
						<>
							<Form
								form={form}
								labelCol={{
									span: 8,
								}}
								initialValues={initialValues}
								layout="horizontal"
								onFinish={onFinishUpdate}
								onFinishFailed={onFinishUpdateFailed}
								autoComplete="off"
								style={{
									width: "100%",
								}}
							>
								<Row>
									<Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
									<Col xs={{ span: 24 }} md={{ span: 16 }}>
										<Row gutter={12}>
											<Col xs={{ span: 24 }} md={{ span: 24 }}>
												<div
													style={{
														display: "flex",
														flexDirection: "column",
														justifyContent: "center",
														alignItems: "center",
														marginBottom: "20px",
													}}
												>
													<Image
														style={{ border: "1px solid black" }}
														height={300}
														weight={300}
														src={`../../../../uploads/${updateData?.imgpath}`}
														alt="view"
													/>
												</div>
											</Col>
										</Row>
										<Row gutter={12}>
											<Col xs={{ span: 24 }} md={{ span: 24 }} layout="vertical">
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
															message: "Please enter product name",
														},
													]}
												>
													<Input placeholder="Product Name" />
												</Form.Item>
											</Col>
										</Row>
										<Row gutter={12}>
											<Col xs={{ span: 24 }} md={{ span: 24 }} layout="vertical">
												<Form.Item
													name="description"
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
															message: "Please enter product description",
														},
													]}
												>
													<Input placeholder="Product Description" />
												</Form.Item>
											</Col>
										</Row>
										<Row gutter={12}>
											<Col xs={{ span: 24 }} md={{ span: 12 }} layout="vertical">
												<Form.Item
													name="price"
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
															message: "Please enter price",
														},
														{
															pattern: /^[0-9]*$/,
															message: "Price should be a number",
														},
													]}
												>
													<Input placeholder="Price" />
												</Form.Item>
											</Col>

											<Col xs={{ span: 24 }} md={{ span: 12 }} layout="vertical">
												<Form.Item
													name="quantity"
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
															message: "Please enter quantity",
														},
														{
															pattern: /^[0-9]*$/,
															message: "Quantity should be a number",
														},
													]}
												>
													<Input placeholder="Quantity" />
												</Form.Item>
											</Col>
										</Row>
										<Row gutter={12}>
											<Col xs={{ span: 24 }} md={{ span: 24 }}>
												<Form.Item
													name="interior"
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
															message: "Please select your recommendation!",
														},
													]}
												>
													<Select placeholder="Recommend for...">
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
															message: "Please select your category!",
														},
													]}
												>
													<Select placeholder="Category">
														{CategoryData.map((value, index) => (
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
													name="subcategory"
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
															message: "Please select your sub-category!",
														},
													]}
												>
													<Select placeholder="Sub-Category" onChange={handleSubCatChange}>
														{SubCategoryData.map((value, index) => (
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
													name="discount"
													labelCol={{
														span: 24,
													}}
													wrapperCol={{
														span: 24,
													}}
													hasFeedback
													rules={[
														{
															pattern: /^[0-9]*$/,
															message: "Discount should be a number",
														},
													]}
												>
													<Input placeholder="Discount(%)" />
												</Form.Item>
											</Col>
										</Row>
										<Row gutter={12}>
											<Col xs={{ span: 24 }} md={{ span: 24 }} layout="vertical">
												<Button type="primary" htmlType="submit">
													UPDATE PRODUCT
												</Button>
											</Col>
										</Row>
									</Col>
									<Col xs={{ span: 24 }} md={{ span: 24 }}></Col>
									<Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
								</Row>
							</Form>
						</>
					) : (
						<></>
					)}
				</Modal>
			</div>
		</Section>
	);
};

export default AddProduct;

const Section = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 20rem;
	.table {
		padding-left: 2rem;
		padding-right: 2rem;
		margin-top: 2rem;
		width: 100%;
	}

	,
	@media screen and (min-width: 280px) and (max-width: 1080px) {
		.table {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 310px;
			.ant-table-wrapper {
				display: Grid;
				grid-template-columns: 1fr;
				right: -100vw;
				overflow-x: auto;
				width: 100%;
			}
		}
	}
`;

// <Col xs={{ span: 24 }} md={{ span: 24 }}>
// <Form.Item name="id">
// 	<Input hidden defaultValue={complainantid} />
// </Form.Item>
// </Col>
