import styled from "styled-components";
import "antd/dist/antd.min.css";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Row, Col, DatePicker, Select, message } from "antd";
import { Typography } from "antd";
import { Box } from "@mui/material";

const { Title, Paragraph } = Typography;

const Container = styled.div`
	height: 100vh;
	background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("./images/bg.jpg") center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	width: { MobileWidth =< 450 ? 75% : 40%};
	padding: 20px;
	background-color: white;
`;

const Button = styled.button`
	width: 100%;
	border: none;
	padding: 15px 20px;
	margin: 10px;
	background-color: teal;
	color: white;
	cursor: pointer;
`;

const ActivateAccountAdmin = () => {
	const [form] = Form.useForm();
	const history = useNavigate();

	const onFinish = async (values) => {
		const data = await fetch("/main/activate-admin", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		});
		const res = await data.json();
		if (res.status === 201) {
			message.success("Activation Completed");
			form.resetFields();
			history("/supplier-login");
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
					<Box paddingBottom="20px" paddingTop="20px" alignItems="center">
						<Title level={2}>ACTIVATION</Title>
					</Box>
				</div>
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
					}}
				>
					<Row>
						<Col xs={{ span: 0 }} md={{ span: 3 }}></Col>
						<Col xs={{ span: 24 }} md={{ span: 18 }}>
							<Row gutter={12}>
								<Col xs={{ span: 12 }} md={{ span: 12 }} layout="vertical">
									<Form.Item
										name="activationcode"
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
												message: "Please input your activation code!",
											},
											{
												pattern: /^[a-zA-Z_0-9 ]*$/,
												message: "Activation should have no special character.",
											},
										]}
									>
										<Input placeholder="Activation Code" />
									</Form.Item>
								</Col>
								<Col xs={{ span: 12 }} md={{ span: 12 }} layout="vertical">
									<Form.Item
										name="email"
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
												type: "email",
												required: true,
												message: "Please enter a valid email",
											},
										]}
									>
										<Input placeholder="Registered Email" />
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={12}>
								<Col xs={{ span: 12 }} md={{ span: 12 }} layout="vertical">
									<Form.Item
										name="firstname"
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
												message: "Please input your first name!",
											},
											{
												pattern: /^[a-zA-Z_ ]*$/,
												message: "First name should have no number.",
											},
										]}
									>
										<Input placeholder="First Name" />
									</Form.Item>
								</Col>
								<Col xs={{ span: 12 }} md={{ span: 12 }}>
									<Form.Item
										name="middlename"
										labelCol={{
											span: 24,
										}}
										wrapperCol={{
											span: 24,
										}}
										hasFeedback
										rules={[
											{
												pattern: /^[a-zA-Z- ]*$/,
												message: "Middle name should have no special characted.",
											},
										]}
									>
										<Input placeholder="Middle Name" />
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={12}>
								<Col xs={{ span: 12 }} md={{ span: 12 }}>
									<Form.Item
										name="lastname"
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
												message: "Please input your last name!",
											},
										]}
									>
										<Input placeholder="Last Name" />
									</Form.Item>
								</Col>

								<Col xs={{ span: 12 }} md={{ span: 12 }}>
									<Form.Item
										name="birthdate"
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
												message: "Please enter your birth date!",
											},
										]}
									>
										<DatePicker style={{ width: "100%" }} placeholder="Date of Birth" />
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={12}>
								<Col xs={{ span: 12 }} md={{ span: 12 }}>
									<Form.Item
										name="gender"
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
												message: "Please select your gender!",
											},
										]}
									>
										<Select placeholder="Gender">
											<Select.Option key="male" value={"Male"}>
												Male
											</Select.Option>
											<Select.Option key="female" value={"Female"}>
												Female
											</Select.Option>
											<Select.Option key="none" value={"None"}>
												Choose not to answer
											</Select.Option>
										</Select>
									</Form.Item>
								</Col>
								<Col xs={{ span: 12 }} md={{ span: 12 }}>
									<Form.Item
										name="age"
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
												message: "Age should be number.",
											},
											{
												required: true,
												message: "Please input your age!",
											},
										]}
									>
										<Input placeholder="Age" />
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={12}>
								<Col xs={{ span: 24 }} md={{ span: 12 }}>
									<Form.Item
										name="password"
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
												message: "Please input your password!",
											},
											{ whitespace: true },
											{ min: 8 },
											{ max: 26 },
											{
												pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,26}$/,
												message: "Must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
											},
										]}
									>
										<Input.Password placeholder="Password" />
									</Form.Item>
								</Col>
								<Col xs={{ span: 24 }} md={{ span: 12 }}>
									<Form.Item
										name="confirmpassword"
										labelCol={{
											span: 24,
											//offset: 2
										}}
										wrapperCol={{
											span: 24,
											//offset: 2
										}}
										hasFeedback
										dependencies={["password"]}
										rules={[
											{
												required: true,
											},
											({ getFieldValue }) => ({
												validator(_, value) {
													if (!value || getFieldValue("password") === value) {
														return Promise.resolve();
													}

													return Promise.reject("Passwords does not matched.");
												},
											}),
										]}
									>
										<Input.Password placeholder="Confirm Password" />
									</Form.Item>
								</Col>
							</Row>
							<Box paddingBottom="20px" paddingTop="20px" alignItems="center">
								<Paragraph>
									By activating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
								</Paragraph>
							</Box>
							<div style={{ display: "flex", flexDirection: "Row", justifyContent: "space-between", width: "100%" }}>
								<Button type="submit">ACTIVATE</Button>
							</div>
						</Col>
					</Row>
				</Form>
				<Row>
					<Col xs={{ span: 0 }} md={{ span: 3 }}></Col>
					<Col xs={{ span: 24 }} md={{ span: 18 }}>
						<Link to={"/admin-login"}>
							<Button style={{ width: "96%" }}>HOMEPAGE</Button>
						</Link>
					</Col>
					<Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
				</Row>
			</Wrapper>
		</Container>
	);
};

export default ActivateAccountAdmin;
