import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all the fields
router.get("/", async (req, res) => {
    let collection = await db.collection("fields");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// Get a single field
router.get("/:id", async (req, res) => {
    let collection = await db.collection("fields");
    let query = {_id: ObjectId(req.params.id)};
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Add a new field to the collection
router.post("/", async (req, res) => {
    let collection = await db.collection("fields");
    let newDocument = {
        name: req.body.name,
        address: req.body.address,
        size: req.body.size,
    };
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

// Update a field by id.
router.patch("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates =  {
      $push: {
        name: req.body.name,
        address: req.body.address,
        size: req.body.size,
      }
    };
  
    let collection = await db.collection("fields");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
});

// Delete a field
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
  
    const collection = db.collection("fields");
    let result = await collection.deleteOne(query);
  
    res.send(result).status(200);
});
  
export default router;

