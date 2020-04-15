import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO{
  title : string,
  value : number,
  type : 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {

    return this.transactions;

  }

  public getBalance( transactions :  Transaction[] ): Balance {

    let income = transactions.filter(transaction => transaction.type === 'income')
    .reduce((index, value) => {
       return index + value.value;
    }, 0);


    let outcome = transactions.filter(transaction => {
      if (transaction.type === 'outcome') {
        return  transaction.value;
      }
    }).reduce((index, value) => {
      return index + value.value;
    }, 0 );


    let balance = {
      income,
      outcome,
      total : income - outcome
    }

    return balance;

  }

  public create({title, value, type} : TransactionDTO): Transaction {

    let balance = this.getBalance(this.transactions);

    if (type === 'outcome' && (balance.total - value < 0)) {
      throw Error("Value cannot be inserted!")
    }

    const transaction = new Transaction({title, value, type})

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
