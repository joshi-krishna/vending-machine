const { StatusCodes } = require('http-status-codes')

const HttpRespsonse = {
  error(response, error) {
    response.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message || error })
  },
  unAuthorized(response, error) {
    response.status(error.statusCode || StatusCodes.UNAUTHORIZED).send({ message: error.message || error })
  },
  success(response, data) {
    response.status(StatusCodes.OK).send(data)
  }
}

module.exports = HttpRespsonse
