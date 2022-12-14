const router = require("express").Router();
const tutorials = require("../controllers/tutorial.controller");

router.get("/", tutorials.findAll);
router.get("/published", tutorials.findAllPublished);
router.get("/:id", tutorials.findOne);
router.post("/", tutorials.create);
router.put("/:id", tutorials.update);
router.delete("/:id", tutorials.delete);
router.delete("/", tutorials.deleteAll);

module.exports = router;
