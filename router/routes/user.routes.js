import express from 'express'
import { findAll, findOne, create, signin, update, remove, updateValidatedEmail } from '../../controllers/user.js';
import {auth} from '../../middlewares/auth.js';

const router = express.Router();

router.get("/checktoken", auth, findOne)

router.get("/all", auth, findAll);
// router.get("/:uuid", findOne);

router.post("/create", create);
router.post("/signin", signin);
router.patch("/validateAccount/:uuid", updateValidatedEmail);

// mise à jour des données 
router.patch("/", auth, update);

router.delete("/:uuid", remove)

export default router;