const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
