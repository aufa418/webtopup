import express from 'express'
import { getProduct, createProduct, updateProduct, deleteProduct, getDataByProductGame, getDataByProductId } from '../controllers/ProductControllers.js'

const router = express.Router()

router.get('/', getProduct)
router.get('/game/:game', getDataByProductGame)
router.get('/id/:id', getDataByProductId)
router.post('/create', createProduct)
router.put('/update/:id', updateProduct)
router.delete('/delete/:id', deleteProduct)

export default router
