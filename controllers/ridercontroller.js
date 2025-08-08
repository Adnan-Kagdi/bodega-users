const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

/** Define Mongoose Location Schema and Model **/
const locationSchema = new mongoose.Schema({
  riderId: {
    type: String,
    required: true,
    unique: true
  },
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  }
});

const Location = mongoose.model('Location', locationSchema);


// this will update or create rider location
const updateRiderController = async (req, res) => {
  try {
    const { riderId, longitude, latitude } = req.body;
    if (!riderId || longitude === undefined || latitude === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let location = await Location.findOne({ riderId });
    if (location) {
      location.longitude = longitude;
      location.latitude = latitude;
      await location.save();
    } else {
      location = new Location({ riderId, longitude, latitude });
      await location.save();
    }

    res.status(200).json({ message: 'Location updated', location });
  } catch (error) {
    res.status(500).json({ message: 'Error updating location', error: error.message });
  }
};

// we will the rider info by using his id 
const getRiderController = async (req, res) => {
  try {
    const { riderId } = req.params;
    if (!riderId) {
      return res.status(400).json({ message: 'Missing riderId in params' });
    }

    const location = await Location.findOne({ riderId });
    if (!location) {
      return res.status(404).json({ message: 'Rider location not found' });
    }

    res.status(200).json({ location });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching location', error: error.message });
  }
};

/** 3. Set up Express routes **/
const router = express.Router();

router.post('/location', updateRiderController);
router.get('/location/:riderId', getRiderController);

// Mount the router under /api/riders
app.use('/api/riders', router);



// we should replace this with the actual MongoDB link after creating the cluster 
const MONGO_URI = 'mongodb://localhost:27017/your_database_name';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');

  /** 5. Start the server after DB connection **/
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
