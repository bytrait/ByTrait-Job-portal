const { Industry } = require("../models");
const logger = require("../utils/logger");

// Create a new industry
exports.createIndustry = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      logger.error("Industry name is required.");
      return res.status(400).json({ message: "Industry name is required." });
    }

    const existing = await Industry.findOne({ where: { name } });
    if (existing) {
      logger.warn("Industry already exists.");
      return res.status(409).json({ message: "Industry already exists." });
    }

    const industry = await Industry.create({ name });
    logger.info("Industry created successfully.");
    return res.status(201).json({ message: "Industry created successfully.", industry });
  } catch (error) {
    logger.error("Error creating industry:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get all industries
exports.getAllIndustries = async (req, res) => {
  try {
    const industries = await Industry.findAll({ order: [["name", "ASC"]] });
    return res.status(200).json({ industries });
  } catch (error) {
    logger.error("Error fetching industries:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Update industry name
exports.updateIndustry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Industry name is required." });
    }

    const industry = await Industry.findByPk(id);
    if (!industry) {
      return res.status(404).json({ message: "Industry not found." });
    }

    industry.name = name.trim();
    await industry.save();

    return res.status(200).json({ message: "Industry updated successfully." });
  } catch (error) {
    logger.error("Error updating industry:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Delete industry
exports.deleteIndustry = async (req, res) => {
  try {
    const { id } = req.params;

    const industry = await Industry.findByPk(id);
    if (!industry) {
      return res.status(404).json({ message: "Industry not found." });
    }

    await industry.destroy();
    return res.status(200).json({ message: "Industry deleted successfully." });
  } catch (error) {
    logger.error("Error deleting industry:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
