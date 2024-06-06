import express from 'express';
import updateProduct from './updateProduct.js';

const router = express.Router();

router.use('/updateproduct', updateProduct)

export default router;