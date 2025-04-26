const { Industry } = require("../models");
const logger = require("../utils/logger");

exports.createIndustry = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      logger.error("Industry name is required.");
      return res.status(400).json({ message: "Industry name is required." });
    }

    // Optional: check for duplicates
    const existing = await Industry.findOne({ where: { name } });
    if (existing) {
        logger.error("Industry already exists.");
      return res.status(409).json({ message: "Industry already exists." });
    }
    logger.info("Creating industry with name:", name);
    const industry = await Industry.create({ name });
    logger.info("Industry created successfully:", industry);
    return res.status(201).json({ message: "Industry created successfully.", industry });
  } catch (error) {
    logger.error("Error creating industry:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

exports.getAllIndustries = async (req, res) => {
  try {
    const industries = await Industry.findAll({ order: [["name", "ASC"]] });
    return res.status(200).json({ industries });
  } catch (error) {
    console.error("Error fetching industries:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
