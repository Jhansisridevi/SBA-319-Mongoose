import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
const collection = await db.collection("restaurants");
//Get - all restaurants
router.get("/", async (req, res) => {
  let results = await collection.find({}).limit(2).toArray();
  return res.send(results).status(200);
});

//GET get one restaurant
router.get("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  const result = await collection.findOne(query);

  if (!result) {
    res.send("Not Found").status(404);
  } else {
    res.send(result).status(200);
  }
});

//POST - Create a restaurant
router.post("/insert", async (req, res) => {
  let newDocument = req.body;
  console.log(req.body);
  newDocument.date = new Date();
  const result = await collection.insertOne({ newDocument });
  //console.log(result);
  if (!result) {
    res.send("Not Found").status(404);
  } else {
    res.send(result).status(204);
  }
});

//PATCH update a name
router.patch("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  console.log(query);
  const updates = {
    $push: { grades: req.body },
  };
  const result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

//PATCH adding to an array
router.patch("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  console.log(query);
  const updates = {
    $set: { name: req.body },
  };
  const result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

//DELETE
router.delete("/:id", async (req, res) => {
  const query = { grade: { $exists: true } };
  console.log(query);
  const deletes = { grade: req.params.id };
  const result = await collection.deleteOne(query, deletes);
  console.log(result);
  if (result.deletedCount === 0) {
    res.send("No document matched the deletion criteria").status(404);
  } else {
    res.send(result).status(204);
  }
});
export default router;
