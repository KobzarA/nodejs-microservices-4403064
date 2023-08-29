const express = require("express");
const CatalogService = require("../lib/CatalogService");

const router = express.Router();

router.get("/items", async (req, res) => {
  try {
    const items = await CatalogService.getAll();
    return res.json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server errors" });
  }
});

router.get("/item/:id", async (req, res) => {
  try {
    const item = await CatalogService.getOne(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found." });
    }
    return res.json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server errors" });
  }
});

router.post("/items", async (req, res) => {
  try {
    const newItem = await CatalogService.create(req.body);
    return res.json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server errors" });
  }
});

router.put("/items/:id", async (req, res) => {
  try {
    const updatedItem = await CatalogService.update(req.params.id, req.body);
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found." });
    }
    return res.json(updatedItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server errors" });
  }
});

router.delete("/items/:id", async (req, res) => {
  try {
    const deletionResult = await CatalogService.update(req.params.id, req.body);
    if (!deletionResult.deletedCount === 0) {
      return res.status(404).json({ error: "Item not found." });
    }
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server errors" });
  }
});

module.exports = router;
