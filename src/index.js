import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Context from "./context/Context";
import Contexts from "./context/SearchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Context>
			<Contexts>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Contexts>
		</Context>
	</React.StrictMode>
);
