import express from 'express'
import userRoutes from './routes/user.routes.js'
import roleRoutes from './routes/role.routes.js'
import productRoutes from './routes/product.routes.js'
import categoryRoutes from './routes/category.routes.js'

const router = express.Router();

router.use("/api/v1/user", userRoutes);
router.use("/api/v1/role", roleRoutes);
router.use("/api/v1/product", productRoutes);
router.use("/api/v1/category", categoryRoutes);



export default router;