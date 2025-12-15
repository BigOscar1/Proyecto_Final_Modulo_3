const { BaseError } = require("../../domain/errors");

function errorHandler(err, req, res, next) {
  console.error("=== ERROR DETECTED ===");
  console.error(err);
  console.error("=====================");

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // Manejo de errores de Mongoose
  // console.log("Mongoose Error Name:", err.name);
  // if (err.name === "ValidationError") {
  //   return res.status(400).json({
  //     message: err.message, 
  //     errors: err.errors, // detalles por campo
  //   });
  // }


  // send a generic error response
  res.status(500).json({
    message: "An internal server error occurred",
  });
}

module.exports = errorHandler;
