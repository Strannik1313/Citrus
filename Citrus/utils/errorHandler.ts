export default function errorHandler(res, error) {
	res.status(500).json({
		success: false,
		message: error.message ?? error,
	});
}
