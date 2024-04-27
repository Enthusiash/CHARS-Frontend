import React, { createContext, useState } from "react";

export const LoginContext = createContext("");

const Context = ({ children }) => {
	const [loginDetails, setLoginDetails] = useState("");

	return (
		<>
			<LoginContext.Provider value={{ loginDetails, setLoginDetails }}>{children}</LoginContext.Provider>
		</>
	);
};

export default Context;
