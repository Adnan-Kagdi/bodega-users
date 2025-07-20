const User = require('../models/userModel');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const updates = {
      username: req.body.username,
    };

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true, 
      runValidators: true,
    }).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Server error while updating profile' });
  }
};

