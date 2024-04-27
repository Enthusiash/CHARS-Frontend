import React from "react";

const UserContact = () => {
	return (
		<>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<iframe
					title="Location"
					style={{
						background: "#FFFFFF",
						border: "none",
						borderRadius: "2px",
						boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
						width: "80%",
						height: "500px",
						marginTop: "50px",
						marginBottom: "50px",
					}}
					src="https://charts.mongodb.com/charts-project-0-wndvx/embed/charts?id=63941eaf-6a27-47c8-8f9f-e16f3eee62e2&maxDataAge=10&theme=light&autoRefresh=true"
				></iframe>
			</div>
		</>
	);
};

export default UserContact;
