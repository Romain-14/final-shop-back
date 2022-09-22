import express from 'express'
// import { findAll, findOne, create, update, remove } from '../../controllers/user.js';
import {create} from '../../controllers/role.js'
// import {auth} from '../middlewares/auth.js';

const router = express.Router();

// router.get("/all", findAll);
// router.get("/:uuid", findOne);

router.post("/create", create);

// mise à jour des données 
// router.patch("/:uuid", update);

// router.delete("/:uuid", remove)

export default router;