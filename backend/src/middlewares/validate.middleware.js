const validate = (schema) => {
  return (req, res, next) => {

    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {

      const errorMessages = {};

      error.details.forEach((err) => {
        errorMessages[err.path[0]] = err.message;
      });

      return res.status(400).json({
        success: false,
        errorMessages,
      });
    }

    next();
  };
};

export default validate;