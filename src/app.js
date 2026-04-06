const express = require('express');
const cors = require('cors');
const { sequelize, User, Record } = require('./config/db');
const { authorize } = require('./middleware/auth');
const dashboardCtrl = require('./controllers/dashboardController');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/api/dashboard', authorize(['Analyst', 'Admin']), dashboardCtrl.getSummary);

app.get('/api/records', authorize(['Viewer', 'Analyst', 'Admin']), async (req, res) => {
  try {
    const { category, type } = req.query;
    const whereClause = {};
    
    if (category) whereClause.category = category;
    if (type) whereClause.type = type;
    
    const records = await Record.findAll({ where: whereClause, order: [['date', 'DESC']] });
    res.json({ success: true, data: records });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


app.post('/api/records', authorize(['Admin']), async (req, res) => {
  try {
    const { amount, type, category, description } = req.body;
    
    // Basic Input Validation
    if (!amount || !type || !category) {
      return res.status(400).json({ success: false, error: 'Amount, type, and category are required.' });
    }

    const record = await Record.create({ amount, type, category, description });
    res.status(201).json({ success: true, data: record });
  } catch (err) { 
    res.status(400).json({ success: false, error: err.message }); 
  }
});


app.post('/api/users', authorize(['Admin']), async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(async () => {
  console.log('Database synced successfully.');

  await User.bulkCreate([
    { id: 1, username: 'admin_user', role: 'Admin' },
    { id: 2, username: 'analyst_user', role: 'Analyst' },
    { id: 3, username: 'viewer_user', role: 'Viewer' }
  ]);
  console.log('Seed users created. IDs: 1 (Admin), 2 (Analyst), 3 (Viewer)');
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});