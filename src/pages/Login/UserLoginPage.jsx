import React from "react";
import UserLogin from "../../components/login/UserLogin";
const UserLoginPage = (props) => {
	const { LoginValid } = props;
	return (
		<>
			<UserLogin LoginValid={LoginValid} />
		</>
	);
};

export default UserLoginPage;
