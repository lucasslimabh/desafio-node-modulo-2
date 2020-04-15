import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import Transaction from '../models/Transaction';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const transactionCreateService = new CreateTransactionService(transactionsRepository);

transactionRouter.get('/', (request, response) => {
  try {
    let list = {};
    let transactions = transactionsRepository.all();
    let balance = transactionsRepository.getBalance(transactions);

    list = { transactions, balance }

    return response.json(list);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const transactionService = transactionCreateService.execute({ title, value, type})
''
    return response.json(transactionService);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
