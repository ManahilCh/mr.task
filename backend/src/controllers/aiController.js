const { generateTaskSuggestions } = require("../services/aiService");

const suggestTask = async (req, res) => {
  const result = generateTaskSuggestions(req.body);
  res.json(result);
};

module.exports = { suggestTask };