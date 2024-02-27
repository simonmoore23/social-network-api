// Importing necessary models
const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  getThought(req, res) {
    // Finding all thoughts
    Thought.find({})
      .then((thought) => res.json(thought)) //Sending found thoughts as JSON response
      .catch((err) => res.status(500).json(err)); // Handling errors
  },
  // get single thought by its ID
  getSingleThought(req, res) {
    // Finding a single thought by its ID
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v") // Excluding '__v' field from response
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID found!" }) // Handling case where no thought is found
          : res.json(thought) // Sending found thought as JSON response
      )
      .catch((err) => res.status(500).json(err)); // Handling errors
  },
  // Create a thought and update the associated user's thoughts array field with the created thought's ID
  createThought(req, res) {
    // Creating a thought using request body
    Thought.create(req.body)
      .then(({ _id }) => {
        // Updating user's thoughts array field with the created thought's ID
        return User.findOneAndUpdate(
          { _id: req.body.userId }, // Finding user by ID
          { $push: { thoughts: _id } }, // Pushing the thought's ID to the user's thoughts array
          { new: true } // Returning the updated user document
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No user with this ID found!" }) // Handling case where no user is found
          : res.json(thought) // Sending updated user document as JSON response
      )
      .catch((err) => res.status(500).json(err)); // Handling errors
  },
  //update a thought by its ID
  updateThought(req, res) {
    // Updating a thought by its ID
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, // Finding thought by ID
      { $set: req.body }, // Setting the new values from request body
      { runValidators: true, New: true } // Running validators and returning updated document
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No thought with this ID found!" }) // Handling case where no thought is found
          : res.json(user) // Sending updated thought as JSON response
      )
      .catch((err) => res.status(500).json(err)); // Handling errors
  },
  //delete a thought by its ID
  deleteThought(req, res) {
    // Deleting a thought by its ID
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID found!" }) // Handling case where no thought is found
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId }, // Finding user by thought ID in their thoughts array
              { $pull: { thoughts: req.params.thoughtId } }, // Removing thought ID from user's thoughts array
              { new: true } // Returning updated user document
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Thought deleted, but no user found'}) // Handling case where user is not found after thought deletion
          : res.json({ message: 'Thought successfully deleted' }) // Sending success message
      )
      .catch((err) => res.status(500).json(err)); // Handling errors
  },
  //create reaction for a thought
  createReaction(req, res) {
    // Adding a reaction to a thought by its ID
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, // Finding thought by ID
      { $addToSet: { reactions: req.body } }, // Adding reaction to reactions array
      { runValidators: true, new: true } // Running validators and returning updated document
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with ID found!" }) // Handling case where no thought is found
          : res.json(thought) // Sending updated thought as JSON response
      )
      .catch((err) => res.status(500).json(err)); // Handling errors
  },
  //delete reaction from a thought
  deleteReaction(req, res) {
    // Removing a reaction from a thought by its ID and reaction ID
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, // Finding thought by ID
      { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Removing reaction by reaction ID
      { runValidators: true, new: true } // Running validators and returning updated document
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID found!" }) // Handling case where no thought is found
          : res.json(thought) // Sending updated thought as JSON response
      )
      .catch((err) => res.status(500).json(err)); // Handling errors
  },
};