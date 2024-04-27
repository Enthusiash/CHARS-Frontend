const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
	app.use(
		["/main", "/validuser", "/validadmin", "/validsupplier", "/uploads"],
		createProxyMiddleware({
			target: "http://localhost:5000" || "https://chars-store.herokuapp.com:5000" || "chars-backend.onrender.com:5000",
		})
	);
};
