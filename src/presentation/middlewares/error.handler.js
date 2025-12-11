const { BaseError } = require("../../domain/errors");

function errorHandler(err, req, res, next) {
  console.log(BaseError);
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // Manejo de errores de Mongoose
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message, // "Product validation failed: stock: Path `stock` is required."
      errors: err.errors, // detalles por campo
    });
  }

  // log the error for debugging purposes
  console.error(err);

  // send a generic error response
  res.status(500).json({
    message: "An internal server error occurred",
  });
}

module.exports = errorHandler;
