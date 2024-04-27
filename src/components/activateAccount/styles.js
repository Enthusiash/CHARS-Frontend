import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();
const useStyles = makeStyles(() => ({
	input: {
		flex: "1",
		minWidth: "40%",
		margin: "20px 10px 0px 0px",
		padding: "10px",
	},
	loginCard: {
		display: "flex",
		alignContent: "center",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		padding: "20px",
		background: "white",
		border: "1px lightgray solid",
		borderRadius: "10px",

		[theme.breakpoints.up("md")]: {
			width: "400px",
		},
		[theme.breakpoints.down("md")]: {
			width: "80%",
		},
	},
	loginDetails: {
		display: "flex",
		alignContent: "center",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		padding: "20px",
		background: "white",

		[theme.breakpoints.up("md")]: {
			width: "360px",
		},
		[theme.breakpoints.down("md")]: {
			width: "100%",
		},
	},
	whoComplaint: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		padding: "20px",
		background: "white",
		border: "1px lightgray solid",
		borderRadius: "10px",

		[theme.breakpoints.up("md")]: {
			width: "120%",
		},
		[theme.breakpoints.down("md")]: {
			width: "100%",
		},
	},
	Form: {
		width: "100%",
	},
}));

export default useStyles;
