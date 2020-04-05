const sendResponse = (res, options) => {
    let {
        statusCode,
        success,
        message,
        data
    } = options

    statusCode = statusCode || 200;
    return res.status(statusCode).json({
        success: success || statusCode < 400,
        message,
        data
    })
}

const ErrorHandler = (handler) => {
    return async (req, res) => {
        try {
            await handler(req, res)
        } catch (e) {
            console.log('this is error:', e)
            return this.serverResponse(res, 500, 'server Error', null)
        }
    }
}

export {
    sendResponse,
    ErrorHandler
}