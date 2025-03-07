const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/', transactionController.addTransaction);
router.get('/:user_id', transactionController.getTransactionsByUser);
router.put('/:transaction_id', transactionController.updateTransaction);

router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
