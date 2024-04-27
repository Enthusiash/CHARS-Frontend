import React from "react";
import SupplierLogin from "../../components/login/SupplierLogin";
const VendorLoginPage = (props) => {
	const { LoginValid } = props;
	return (
		<>
			<SupplierLogin LoginValid={LoginValid} />
		</>
	);
};

export default VendorLoginPage;
