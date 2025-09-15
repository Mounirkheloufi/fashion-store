function successResponse(res, data, status = 2002) {
    return res.status(status).json({ success: true, data});
}

function errorResponse(res, message, status = 400) {
    return res.status(status).json({ success: false, error: message });
}

module.exports = { successResponse, errorResponse};