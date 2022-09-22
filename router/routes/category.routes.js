import express from 'express';
import { create, findAll } from '../../controllers/category.js';

const router = express.Router();

// GET
router.get("/all", findAll);

//POST
router.post("/create", create);

export default router;