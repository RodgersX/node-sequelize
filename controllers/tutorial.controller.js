const db = require("../models");

const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  const { title, description, published } = req.body;

  const tutorial = {
    title: title,
    description: description,
    published: published ? published : false,
  };
  try {
    const data = await Tutorial.create(tutorial);
    return res.status(201).send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error occured while creating new tutorial",
    });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  const title = req.body.title;
  try {
    const data = await Tutorial.findAll();
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error occured while retrieving tutorials",
    });
  }
};
// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  const id = request.params.id;
  try {
    const data = await Tutorial.findByPk(id);
    if (data) {
      return res.status(200).sed(data);
    } else {
      return res.status(404).send({
        message: `Cannot find Tutorial with id ${id}`,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message || `Error retrieving tutorial with id ${id}`,
    });
  }
};
// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  const id = request.params.id;

  try {
    const num = await Tutorial.update(req.body, { where: { id: id } });
    if (num === 1) {
      return res.status(201).send({ message: "Tutorial updated successfully" });
    } else {
      return res.status(401).send({
        message: `Cannot update tutorial with id ${id}. Maybe Tutorial was not found or req.body is empty! `,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message || `Error updating tutorial with id ${id}`,
    });
  }
};
// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Tutorial.destroy({ where: { id: id } });
    if (num === 1) {
      res.status(201).send({ message: "Tutorial was delted successfully" });
    } else {
      res.send({
        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message || `Error deleting tutorial with id ${id}`,
    });
  }
};
// Delete all Tutorials from the database.
exports.deleteAll = async (req, res) => {
  try {
    const nums = await Tutorial.destroy({ where: {}, truncate: false });
    return res.status(201).send({
      message: `${nums} tutorials were deleted successfully`,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error occured while removing all tutorials",
    });
  }
};
// Find all published Tutorials
exports.findAllPublished = async (req, res) => {
  try {
    const data = await Tutorial.findAll({ where: { published: true } });
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({
      message:
        err.message || "Error occured while retrieving all pulished tutorials",
    });
  }
};
