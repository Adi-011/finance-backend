const { User } = require('../config/db');

const authorize = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      // In a real app, you would extract and verify a JWT token here.
      // For this assignment, we simulate auth via a custom header.
      const userId = req.headers['x-user-id'];
      
      if (!userId) {
        return res.status(401).json({ error: 'Authentication required. Please provide x-user-id header.' });
      }

      const user = await User.findByPk(userId);
      
      if (!user || !user.isActive) {
        return res.status(403).json({ error: 'User not found or inactive.' });
      }

      // Check if user role is in the allowed roles array
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: `Access Denied: Requires one of [${allowedRoles.join(', ')}]` });
      }

      // Attach user to request for downstream use
      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error during authentication.' });
    }
  };
};

module.exports = { authorize };