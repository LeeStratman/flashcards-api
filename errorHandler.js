function handleErrors(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof Error)
    return res.status(400).json({ data: { error: err.message } });
}

module.exports = handleErrors;
