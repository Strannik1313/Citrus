module.exports = (err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}
	res.status(500).json({
		success: false,
		message: err.message ?? err,
	});
};
