/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, useContext } from "react";
import "antd/dist/antd.min.css";
import { Input, Space, Table, Modal, message } from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { Button } from "@mui/material";
import Highlighter from "react-highlight-words";
import styled from "styled-components";
import { LoginContext } from "../../context/Context";

export default function PaymentAndTransaction(props) {
	const [data, setData] = useState([]);
	const [orderItems, setOrderItems] = useState();
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
	const { loginDetails } = useContext(LoginContext);

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// API CALL
	const getData = async () => {
		setLoading(true);
		const res = await fetch(`/main/get-order-successful/${loginDetails.validuser?._id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const dataComp = await res.json();
		setData([dataComp]);
		setLoading(false);
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
			title: "ID",
			dataIndex: "id",
			key: "id",
			width: "5%",
			...getColumnSearchProps("id"),
		},
		{
			title: "ORDER NUMBER",
			dataIndex: "orderId",
			key: "orderId",
			width: "15%",
			...getColumnSearchProps("orderId"),
		},
		{
			title: "Customer",
			dataIndex: "userId",
			key: "userId",
			width: "15%",
			...getColumnSearchProps("userId"),
		},
		{
			title: "Delivery Status",
			dataIndex: "deliverystatus",
			key: "deliverystatus",
			width: "15%",
		},
		{
			title: "Payment Method",
			dataIndex: "paymentmethod",
			key: "paymentmethod",
			width: "15%",
		},
		{
			title: "Delivery Received Date",
			dataIndex: "deliverytime",
			key: "deliverytime",
			width: "20%",
		},
		{
			title: "Payment Status",
			dataIndex: "paymentstatus",
			key: "paymentstatus",
			width: "20%",
		},
	];

	return (
		<Section>
			<div className="table">
				<Table columns={columns} dataSource={data[0]?.body} pagination={pagination} loading={loading} />
			</div>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<iframe
					title="Top Sales"
					style={{
						background: "#FFFFFF",
						border: "none",
						borderRadius: "2px",
						boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
						width: "90%",
						height: "500px",
						marginTop: "50px",
						marginBottom: "50px",
					}}
					src="https://charts.mongodb.com/charts-project-0-wndvx/embed/charts?id=6395d8a4-293a-458d-8e7a-b34c5041d0b7&maxDataAge=10&theme=light&autoRefresh=true"
				></iframe>
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
