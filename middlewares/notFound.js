const notFound = (req, res) => {
  res.status(404).json({ success: false, msg: `route not found` });
};

module.exports = notFound