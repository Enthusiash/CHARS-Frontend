import React from "react";
import styled from "styled-components";
import "antd/dist/antd.min.css";
import { useNavigate } from "react-router-dom";
import { Form, Input, Row, Col, message } from "antd";
import { Typography, Box, Button, Link } from "@mui/material";
import useStyles from "./styles";

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("./images/bg.jpg") center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	width: 25%;
	padding: 20px;
	background-color: white;
`;

const UserLogin = (props) => {
	const classes = useStyles();
	const history = useNavigate();

	const { LoginValid } = props;

	const onFinish = async (values) => {
		const data = await fetch("/main/user-login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		});
		const res = await data.json();
		if (res.status === 201) {
			message.success("Credentials Matched. Logging in...");
			localStorage.setItem("userDataToken", res.result.token);
			LoginValid();
			history("/home");
		} else {
			message.error(res.error);
		}
	};

	const onFinishFailed = (error) => {
		message.error(error);
	};

	return (
		<Container>
			<Wrapper>
				<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
					<span>
						<img style={{ width: "200px", height: "80px" }} src="./images/chars-logo.png" alt="logo" />
					</span>
					<Box paddingBottom="20px" paddingTop="20px" alignItems="center">
						<Typography fontSize="32px">USER LOGIN</Typography>
					</Box>
				</div>
				<Form
					name="basic"
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					className={classes.Form}
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
					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: "Password is required!",
							},
						]}
					>
						<Input.Password placeholder="Password" />
					</Form.Item>
					<Box className={classes.loginDetails}>
						<Row>
							<Col xs={{ span: 24 }} md={{ span: 24 }}>
								<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
									<Form.Item>
										<Button type="submit" style={{ backgroundColor: "teal", color: "white" }}>
											LOGIN
										</Button>
									</Form.Item>
									<Form.Item>
										<Typography style={{ textDecoration: "none" }} component={Link} href="/user-activate" sx={{ "&:hover": { cursor: "pointer" } }}>
											ACTIVATE YOUR ACCOUNT
										</Typography>
									</Form.Item>
									<Form.Item>
										<Typography style={{ textDecoration: "none" }} component={Link} href="/supplier-login" sx={{ "&:hover": { cursor: "pointer" } }}>
											LOGIN AS SUPPLIER
										</Typography>
									</Form.Item>
								</div>
							</Col>
						</Row>
					</Box>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default UserLogin;

// <Link>FORGOT PASSWORD?</Link>
// <Link>ACTIVATE YOUR ACCOUNT</Link>
// <Link>BACK TO HOMEPAGE</Link>
