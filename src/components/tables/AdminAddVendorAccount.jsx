import React, { useState, useRef, useEffect } from "react";
import "antd/dist/antd.min.css";
import { Input, Space, Table, Modal, message, Form } from "antd";
import { SearchOutlined, PlusCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button } from "@mui/material";
import Highlighter from "react-highlight-words";
import styled from "styled-components";
import emailjs from "@emailjs/browser";

export default function AdminAddVendorAccount(props) {
	const [form] = Form.useForm();
	const [data, setData] = useState([]);
	const [modal, setModal] = useState(false);
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

	const activation = (Math.random() + 1).toString(36).substring(2);
	const initialValues = {
		activationcode: activation,
	};

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// API CALL
	const getData = async () => {
		setLoading(true);
		const res = await fetch("/main/vendors", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const dataComp = await res.json();
		setData([dataComp]);
		setLoading(false);
	};
	// ______END_____

	const onFinish = async (values) => {
		const data = await fetch("/main/vendor-registration", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		});
		const res = await data.json();
		console.log(res);
		if (res.status === 201) {
			message.success("Successfully Added");
			emailjs.send(
				"service_2xlsx1a",
				"template_i1kznrb",
				{
					code: activation,
					email: values.email,
				},
				"5qq2Do19EsIGyeLBu"
			);
			getData();
			form.resetFields();
			setModal(false);
		} else {
			message.error(res.error);
		}
	};

	const onFinishFailed = (error) => {
		message.error(error);
	};

	// TABLE SETUP

	const ViewRecord = (record) => {
		console.log(record);
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
			title: "ID",
			dataIndex: "vendoruserid",
			key: "vendoruserid",
			width: "10%",
			...getColumnSearchProps("vendoruserid"),
		},
		{
			title: "First Name",
			dataIndex: "firstname",
			key: "firstname",
			width: "10%",
			...getColumnSearchProps("firstname"),
		},
		{
			title: "Last Name",
			dataIndex: "lastname",
			key: "lastname",
			width: "10%",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			width: "15%",
			...getColumnSearchProps("email"),
		},
		{
			title: "Business Name",
			dataIndex: "businessname",
			key: "businessname",
			width: "30%",
		},
		{
			title: "Activation Code",
			dataIndex: "activationcode",
			key: "activationcode",
			width: "10%",
		},
		{
			title: "Account Status",
			dataIndex: "accountstatus",
			key: "accountstatus",
			width: "20%",
		},
		{
			title: (
				<>
					<props.button type="primary" shape="round" icon={<PlusCircleOutlined />} onClick={() => setModal(true)}>
						ADD SUPPLIER
					</props.button>
				</>
			),
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

	return (
		<Section>
			<div className="table">
				<Table columns={columns} dataSource={data[0]?.body} pagination={pagination} loading={loading} />
			</div>
			<div className="modal">
				<Modal
					title="ADD VENDOR ACCOUNT"
					open={modal}
					onCancel={() => {
						setModal(false);
						form.resetFields();
					}}
					footer={[
						<Button
							key="cancel"
							onClick={() => {
								setModal(false);
								form.resetFields();
							}}
						>
							Cancel
						</Button>,
					]}
				>
					<div>
						<Form
							form={form}
							name="basic"
							labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }}
							initialValues={initialValues}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete="off"
						>
							<Form.Item
								label="Email"
								name="email"
								rules={[
									{
										message: "Email is required!",
										required: true,
									},
									{ whitespace: true },
									{ type: "email", message: "Please enter a valid email" },
								]}
								hasFeedback
							>
								<Input placeholder="Email" />
							</Form.Item>
							<Form.Item>
								<Button type="submit" style={{ backgroundColor: "teal", color: "white" }}>
									ADD
								</Button>
							</Form.Item>
							<Form.Item name="activationcode">
								<Input hidden />
							</Form.Item>
						</Form>
					</div>
				</Modal>
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
