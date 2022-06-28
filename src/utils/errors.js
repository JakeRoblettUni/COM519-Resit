module.exports.HttpError = class extends Error {

    constructor(httpStatus, message) {
        super(message);
        this.httpStatus = httpStatus;
    }

}