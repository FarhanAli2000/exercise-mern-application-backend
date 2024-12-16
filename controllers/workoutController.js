const workouts = require("../models/Workout.js");

//get all workouts
const getWorkouts = async (req, res) => {
    try {
      const allWorkouts = await workouts.find({}).sort({ createdAt: -1 });
      res.status(200).json(allWorkouts);
    } catch (error) {
      console.error("Error fetching workouts:", error);  
      res.status(400).json({ error: error.message });
    }
  };

//get a single workout

const getWorkout = async (req, res) => {
    const { id } = req.params;
    try {
      const workout = await workouts.findById(id);
      if (!workout) {
        return res.status(404).json({ error: 'No such workout' });
      }
      res.status(200).json(workout);  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

//create new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const WorkOut = await workouts.create({ title, load, reps });
    res.status(200).json(WorkOut);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout

const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await workouts.findByIdAndDelete(id);

        if (!workout) {
          return res.status(404).json({ error: 'Workout not found' });
        }
    
        res.status(200).json({ message: 'Workout deleted successfully', workout });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

//update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
  
    try {
     
      // Attempt to update the workout
      const workout = await workouts.findByIdAndUpdate(
        id,
        { ...req.body }, // Spread req.body to update the document
        // { new: true, runValidators: true } // Options to return the updated document and validate updates
      );
  
      if (!workout) {
        return res.status(404).json({ error: 'Workout not found' });
      }
  
      res.status(200).json({ message: 'Workout updated successfully', workout });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

module.exports = {
  createWorkout,getWorkouts,getWorkout,deleteWorkout,updateWorkout
};
