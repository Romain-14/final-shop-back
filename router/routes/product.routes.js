import express from 'express';
import { findAll, find, create, addImg } from '../../controllers/product.js';

const router = express.Router();

// GET
router.get("/all", findAll);
router.get("/:col_name/:value", find);

//POST
router.post("/create", create);
router.post("/addImg/:uuid", addImg);

export default router;