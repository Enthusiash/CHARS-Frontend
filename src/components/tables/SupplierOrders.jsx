/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, useContext } from "react";
import "antd/dist/antd.min.css";
import { Input, Space, Table, Modal, Form, message, Select } from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { Button } from "@mui/material";
import Highlighter from "react-highlight-words";
import styled from "styled-components";
import { LoginContext } from "../../context/Context";
import { SupplierComplaintStatus } from "./Data";

export default function SupplierOrder(props) {
	const [data, setData] = useState([]);
	const [orderItems, setOrderItems] = useState();
	const [status, setStatus] = useState(true);
	const [viewData, setViewData] = useState([]);
	const [modal, setModal] = useState(false);
	const [searchedColumn, setSearchedColumn] = useState("");
	const [searchText, setSearchText] = useState("");
	const [loading, setLoading] = useState(false);
	const searchInput = useRef(null);
	const [pagination, setPagination] = useState({
		defaultCurrent: 1,
		pageSize: 10,
		total: data[0]?.body.length,
	});
	const [form] = Form.useForm();
	const { loginDetails } = useContext(LoginContext);

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getData = async () => {
		setLoading(true);
		const res = await fetch(`/main/get-supplier-order/${loginDetails.validuser?._id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const dataComp = await res.json();
		setData([dataComp]);
		setLoading(false);
	};

	const onClearForms = () => {
		setModal(false);
		setStatus(true);
		form.resetFields();
	};

	const onFinish = async (values) => {
		const data = await fetch(`/main/update-supplier-order/${viewData?._id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		});
		const res = await data.json();
		if (res.status === 201) {
			message.success("Order Updated Successfully");
			onClose();
			getData();
			onClearForms();
		} else {
			message.error(res.error);
		}
	};

	const onFinishFailed = () => {
		message.error("Please input all the required details");
	};

	const onClose = () => {
		setModal(false);
		form.resetFields();
	};

	const enableStatus = () => {
		setStatus(false);
	};

	const ViewRecord = (record) => {
		setViewData(record);
		setOrderItems(record?.items);
		setModal(true);
	};

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

	const columns = [
		{
			title: "ORDER ID",
			dataIndex: "deliverId",
			key: "deliverId",
			width: "10%",
			...getColumnSearchProps("deliverId"),
		},
		{
			title: "Supplier",
			dataIndex: "supplier",
			key: "supplier",
			width: "15%",
		},
		{
			title: "Delivery Status",
			dataIndex: "deliverystatus",
			key: "deliverystatus",
			width: "20%",
		},
		{
			title: "Ordered Time",
			dataIndex: "timeAndDate",
			key: "timeAndDate",
			width: "20%",
		},
		{
			title: "Payment Method",
			dataIndex: "paymentmethod",
			key: "paymentmethod",
			width: "20%",
		},
		{
			title: "Delivery Received Date",
			dataIndex: "deliverytime",
			key: "deliverytime",
			width: "20%",
		},
		{
			title: "",
			dataIndex: "",
			key: "x",
			width: "10%",
			render: (record) => (
				<>
					<div style={{ display: "flex" }}>
						<props.button
							style={{ backgroundColor: "teal", color: "white" }}
							shape="round"
							icon={<EyeOutlined />}
							onClick={() => {
								ViewRecord(record);
							}}
						>
							View
						</props.button>
					</div>
				</>
			),
		},
	];

	console.log(viewData);

	const initialValues = {
		deliverystatus: viewData?.deliverystatus,
	};

	return (
		<Section>
			<div className="table">
				<Table columns={columns} dataSource={data[0]?.body} pagination={pagination} loading={loading} />
			</div>
			<div className="modal">
				<div className="modals">
					<Modal
						key="1"
						title="ORDER DETAILS"
						width={1500}
						open={modal}
						onCancel={() => {
							setModal(false);
						}}
						footer={[
							<>
								{status ? (
									<props.button type="primary" key="updatestatus" shape="round" onClick={enableStatus}>
										Update Status
									</props.button>
								) : (
									<></>
								)}
								,
							</>,
							<props.button
								key="cancel"
								shape="round"
								onClick={() => {
									setModal(false);
									onClearForms();
								}}
							>
								Cancel
							</props.button>,
						]}
					>
						<section>
							<div className="container d_flex">
								{/* if hamro cart ma kunai pani item xaina bhane no diplay */}

								<div className="cart-details">
									{/* yasma hami le cart item lai display garaaxa */}
									{orderItems ? (
										<>
											{orderItems.map((item) => {
												const productQty = item.price * item.qty;

												return (
													<div className="cart-list product d_flex" key={item.id}>
														<div className="img">
															<img style={{ width: "200px", height: "200px" }} src={`../../../../uploads/${item.imgpath}`} alt="" />
														</div>
														<div className="cart-details" style={{ marginLeft: "20px" }}>
															<h3>{item.name}</h3>
															<h4>
																Php {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00 * {item.qty}
																<span style={{ marginLeft: "100px" }}>
																	Php {productQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00
																</span>
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
										</>
									) : (
										<></>
									)}
								</div>
								<div className="cart-total product" style={{ width: "50%" }}>
									<h2>Order Summary</h2>
									<div className=" d_flex">
										<h4>Total Price :</h4>
										<h3>Php {viewData ? viewData?.totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}.00</h3>
									</div>
									<div className=" d_flex">
										<h4>Receiver: </h4>
										<h3>{viewData.username}</h3>
									</div>
									<div className=" d_flex">
										<h4>Delivery Address: </h4>
										<h3>{viewData.address}</h3>
									</div>
									<div className=" d_flex">
										<h4>Payment Medhod: </h4>
										<h3>Cash on Delivery</h3>
									</div>
									<Form
										form={form}
										labelCol={{
											span: 8,
										}}
										initialValues={initialValues}
										layout="horizontal"
										onFinish={onFinish}
										onFinishFailed={onFinishFailed}
										autoComplete="off"
										style={{
											width: "100%",
											maxHeight: "100vh",
										}}
									>
										<div className=" d_flex">
											<h4>Deliver Status: </h4>
											{status ? (
												<>
													<h3>{viewData.deliverystatus}</h3>
												</>
											) : (
												<Form.Item name="deliverystatus" hasFeedback>
													<Select style={{ width: "300px" }} disabled={status}>
														{SupplierComplaintStatus.map((value, index) => (
															<Select.Option key={index} value={value.name}>
																{value.label}
															</Select.Option>
														))}
													</Select>
												</Form.Item>
											)}
										</div>
										{status ? (
											<></>
										) : (
											<>
												<props.button type="primary" htmlType="submit">
													Update
												</props.button>
											</>
										)}
									</Form>
								</div>
							</div>
						</section>
					</Modal>
				</div>
			</div>
		</Section>
	);
}

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
