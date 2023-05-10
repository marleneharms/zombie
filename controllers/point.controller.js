const Point = require("../models/point.schema");
const { BadRequestError } = require("../helpers/errors");

exports.getAllPoints = async (req, res) => {
  try {
    const points = await Point.find();
    res.status(200).json(points);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single point by id, using the id from the request parameters
exports.getPoint = async (req, res) => {
  const { id } = req.params;
  try {
    const point = await Point.findById(id);
    res.status(200).json(point);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Create a single point validating the request body
exports.createPoint = async (req, res) => {
  if (!req.body) {
    throw new BadRequestError("Point data not included in the request body.");
}

try {
    const created = await Point.create(req.body);
    res.status(201).json(created);
} catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
}
};

// Update a single point by id, and update the post with the data from the request body
exports.updatePoint = async (req, res) => {
    const { id } = req.params
    if (!req.body) {
        throw new BadRequestError("Point data not included in the request body.");
    }
    
    try {
        const updated = await Point.findOneAndUpdate({ name: id }, req.body)
        res.status(200).json(updated);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// Delete a single point by id
exports.deletePoint = async (req, res) => {
    const {id} = req.params
    try {
        const deleted = await Point.deleteOne({ name: id })
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};
