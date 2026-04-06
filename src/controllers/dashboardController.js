const { Record, sequelize } = require('../config/db');

exports.getSummary = async (req, res) => {
  try {
    // Calculate total income vs expenses
    const overallStats = await Record.findAll({
      attributes: [
        'type',
        [sequelize.fn('SUM', sequelize.col('amount')), 'total']
      ],
      group: ['type']
    });

    // Calculate totals broken down by category
    const categoryTotals = await Record.findAll({
      attributes: [
        'category', 
        [sequelize.fn('SUM', sequelize.col('amount')), 'total']
      ],
      group: ['category']
    });

    res.json({
      success: true,
      data: {
        overallStats,
        categoryTotals
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};