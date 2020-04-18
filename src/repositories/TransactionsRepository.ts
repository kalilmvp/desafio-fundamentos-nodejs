import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // MODO NOOB DE SE FAZER
    /* if (this.transactions && this.transactions.length === 0) {
      return {
        income: 0,
        outcome: 0,
        total: 0,
      };
    }
    const transIncomeValue = this.transactions.map(trans => {
      return trans.type === 'income' ? trans.value : 0;
    });
    const transOutComeValue = this.transactions.map(trans => {
      return trans.type === 'outcome' ? trans.value : 0;
    });
    const income = transIncomeValue.reduce((acc, current) => acc + current);
    const outcome = transOutComeValue.reduce((acc, current) => acc + current);
    return {
      income,
      outcome,
      total: income - outcome,
    }; */
    // MODO MAIS PROFISSIONAL DE SE FAZER
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        if (transaction.type === 'income') {
          accumulator.income += transaction.value;
        } else if (transaction.type === 'outcome') {
          accumulator.outcome += transaction.value;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
