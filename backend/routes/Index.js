const express = require('express');
const { getProduct, createProduct, updateProduct, deleteProduct, getDataByProductGame, getDataByProductId } = require('../controllers/ProductControllers.js');
const { getPaymentToken } = require('../controllers/PaymentControllers.js');
const { deleteTransaction, getAllTransaction, storeTransaction } = require('../controllers/TransactionControllers.js');
const { loginUser, logoutAccount, refreshToken } = require('../controllers/AuthControllers.js');
const { verifyToken } = require('../middlewares/VerifyToken.js');

const router = express.Router();

router.get('/', getProduct);
router.get('/game/:game', getDataByProductGame);
router.get('/id/:id', getDataByProductId);
router.post('/create', createProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

router.post('/payment', getPaymentToken);

router.get('/transaction', getAllTransaction);
router.post('/transaction/create', storeTransaction);
router.delete('/transaction/delete/:id', deleteTransaction);

router.post('/login', loginUser);
router.delete('/logout', logoutAccount);
router.get('/token', refreshToken);

module.exports = router;

