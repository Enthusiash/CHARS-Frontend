import React from "react";
import AdminLogin from "../../components/login/AdminLogin";

const AdminLoginPage = (props) => {
	const { LoginValid } = props;
	return (
		<>
			<AdminLogin LoginValid={LoginValid} />
		</>
	);
};

export default AdminLoginPage;
