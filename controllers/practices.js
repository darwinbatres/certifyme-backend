module.exports.getAll = (req, res) => {
  res.json({
    message: 'i am giving all the existing practices',
  });
};

module.exports.post = (req, res) => {
  res.json({ message: 'this is where you send your response' });
};
