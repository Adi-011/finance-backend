const { Record, sequelize } = require('../config/db');

exports.getSummary = async (req, res) => {
  try {
  
    const overallStats = await Record.findAll({
      attributes: [
        'type',
        [sequelize.fn('SUM', sequelize.col('amount')), 'total']
      ],
      group: ['type']
    });

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