import express from "express";
import { createNewTag, deleteTag, getAllTags, getSpecificTag, updateTag } from "../controllers/tag.js";

export const tagRoutes = express.Router();

// view all tags
tagRoutes.get("/", getAllTags);

// view specific tag
tagRoutes.get("/:tagId", getSpecificTag);

// create new tag
tagRoutes.post("/create", createNewTag);

// update tag
tagRoutes.patch("/:tagId/edit", updateTag);

// delete tag
tagRoutes.delete("/:tagId/delete", deleteTag);