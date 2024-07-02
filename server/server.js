const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const dbName = 'recipedatabase';
mongoose.connect(`mongodb+srv://kabyabasu:Aru12198484@cluster0.z9xz5p7.mongodb.net/${dbName}`)
.then(()=> console.log("Connection done with mongodb ATLAS" ))
.catch(err=> console.log("Connection failed. Could not connect to MongoDB Atlas",err))

// Define the schema
const exerciseSchema = new mongoose.Schema({
    Name: String,
    URL: String,
    WorkoutType: String,
    EquipmentNeeded: String,
    Focus: String,
    Difficulty: String,
    MusclesInvolved: String,
    Target: String,
    Neck: Number,
    UpperBack: Number,
    LowerBack: Number,
    Shoulder: Number,
    Elbow: Number,
    WristHand: Number,
    Hip: Number,
    Knee: Number,
    AnkleFoot: Number,
    DeepNeckFlexors: Number,
    CervicalFlexors: Number,
    CervicalExtensors: Number,
    Pectoral: Number,
    TrapezuisUpper: Number,
    TrapezuisMiddle: Number,
    TrapezuisLower: Number
});

const Exercise = mongoose.model('Exercisemodel', exerciseSchema,'ExerciseDB');

// Routes
app.get('/exercises', async (req, res) => {
    const { name, focus } = req.query;
    let query = {};
    if (name) {
        query.Name = new RegExp(name, 'i'); // Case insensitive search
    }
    if (focus) {
        query.Focus = new RegExp(focus, 'i'); // Case insensitive search
    }
    try {
        const exercises = await Exercise.find(query);
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
