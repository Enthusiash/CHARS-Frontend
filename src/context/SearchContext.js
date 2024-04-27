import React, { createContext, useState } from "react";

export const SearchContext = createContext("");

const Contexts = ({ children }) => {
	const [productItems, setProductItems] = useState("");

	return (
		<>
			<SearchContext.Provider value={{ productItems, setProductItems }}>{children}</SearchContext.Provider>
		</>
	);
};

export default Contexts;
