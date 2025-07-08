import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { formatCurrency } from '../utils/formatters';

export interface Account {
  id: string;
  name: string;
  type: 'bank' | 'cash' | 'mobile' | 'credit' | 'investment';
  balance: number;
  currency: string;
  icon: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'expense' | 'income';
  icon: string;
  parentId?: string;
  createdAt: string;
}

export interface Wallet {
  id: string;
  name: string;
  icon: string;
  balance: number;
  limit?: number;
  limitType?: 'monthly' | 'one-time';
  resetDate?: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'expense' | 'income' | 'transfer';
  accountId: string;
  categoryId?: string;
  walletId?: string;
  description?: string;
  date: string;
  createdAt: string;
  transferToAccountId?: string;
}

interface DataContextType {
  accounts: Account[];
  categories: Category[];
  wallets: Wallet[];
  transactions: Transaction[];
  addAccount: (account: Omit<Account, 'id' | 'createdAt'>) => void;
  addCategory: (category: Omit<Category, 'id' | 'createdAt'>) => void;
  addWallet: (wallet: Omit<Wallet, 'id' | 'createdAt'>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  updateAccount: (id: string, account: Partial<Account>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  updateWallet: (id: string, wallet: Partial<Wallet>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteAccount: (id: string) => void;
  deleteCategory: (id: string) => void;
  deleteWallet: (id: string) => void;
  deleteTransaction: (id: string) => void;
  getTotalBalance: () => number;
  getAccountBalance: (accountId: string) => number;
  getMonthlyStats: () => { income: number; expense: number; };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const defaultAccounts: Account[] = [
  {
    id: '1',
    name: 'Cash',
    type: 'cash',
    balance: 0,
    currency: 'USD',
    icon: 'DollarSign',
    createdAt: new Date().toISOString()
  }
];

const defaultCategories: Category[] = [
  { id: '1', name: 'Food & Dining', type: 'expense', icon: 'UtensilsCrossed', createdAt: new Date().toISOString() },
  { id: '2', name: 'Transportation', type: 'expense', icon: 'Car', createdAt: new Date().toISOString() },
  { id: '3', name: 'Shopping', type: 'expense', icon: 'ShoppingBag', createdAt: new Date().toISOString() },
  { id: '4', name: 'Entertainment', type: 'expense', icon: 'Gamepad2', createdAt: new Date().toISOString() },
  { id: '5', name: 'Bills & Utilities', type: 'expense', icon: 'Receipt', createdAt: new Date().toISOString() },
  { id: '6', name: 'Salary', type: 'income', icon: 'Briefcase', createdAt: new Date().toISOString() },
  { id: '7', name: 'Investment', type: 'income', icon: 'TrendingUp', createdAt: new Date().toISOString() },
  { id: '8', name: 'Gift', type: 'income', icon: 'Gift', createdAt: new Date().toISOString() }
];

const defaultWallets: Wallet[] = [
  {
    id: '1',
    name: 'Monthly Budget',
    icon: 'Calendar',
    balance: 0,
    limit: 2000,
    limitType: 'monthly',
    createdAt: new Date().toISOString()
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  const [accounts, setAccounts] = useState<Account[]>(() => {
    const saved = localStorage.getItem('accounts');
    return saved ? JSON.parse(saved) : defaultAccounts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [wallets, setWallets] = useState<Wallet[]>(() => {
    const saved = localStorage.getItem('wallets');
    return saved ? JSON.parse(saved) : defaultWallets;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('wallets', JSON.stringify(wallets));
  }, [wallets]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addAccount = (account: Omit<Account, 'id' | 'createdAt'>) => {
    const newAccount: Account = {
      ...account,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setAccounts(prev => [...prev, newAccount]);
  };

  const addCategory = (category: Omit<Category, 'id' | 'createdAt'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const addWallet = (wallet: Omit<Wallet, 'id' | 'createdAt'>) => {
    const newWallet: Wallet = {
      ...wallet,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setWallets(prev => [...prev, newWallet]);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setTransactions(prev => [...prev, newTransaction]);
    
    // Update account balances
    setAccounts(prev => prev.map(account => {
      if (account.id === transaction.accountId) {
        let balanceChange = 0;
        if (transaction.type === 'expense') {
          balanceChange = -transaction.amount;
        } else if (transaction.type === 'income') {
          balanceChange = transaction.amount;
        } else if (transaction.type === 'transfer') {
          balanceChange = -transaction.amount;
        }
        return { ...account, balance: account.balance + balanceChange };
      }
      
      if (transaction.type === 'transfer' && account.id === transaction.transferToAccountId) {
        return { ...account, balance: account.balance + transaction.amount };
      }
      
      return account;
    }));
    
    // Update wallet balance
    if (transaction.walletId) {
      setWallets(prev => prev.map(wallet => {
        if (wallet.id === transaction.walletId) {
          const balanceChange = transaction.type === 'expense' ? -transaction.amount : transaction.amount;
          return { ...wallet, balance: wallet.balance + balanceChange };
        }
        return wallet;
      }));
    }
  };

  const updateAccount = (id: string, account: Partial<Account>) => {
    setAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, ...account } : acc));
  };

  const updateCategory = (id: string, category: Partial<Category>) => {
    setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, ...category } : cat));
  };

  const updateWallet = (id: string, wallet: Partial<Wallet>) => {
    setWallets(prev => prev.map(wal => wal.id === id ? { ...wal, ...wallet } : wal));
  };

  const updateTransaction = (id: string, transaction: Partial<Transaction>) => {
    setTransactions(prev => prev.map(trans => trans.id === id ? { ...trans, ...transaction } : trans));
  };

  const deleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(acc => acc.id !== id));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const deleteWallet = (id: string) => {
    setWallets(prev => prev.filter(wal => wal.id !== id));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(trans => trans.id !== id));
  };

  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  const getAccountBalance = (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId);
    return account ? account.balance : 0;
  };

  const getMonthlyStats = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyTransactions = transactions.filter(trans => {
      const transDate = new Date(trans.date);
      return transDate.getMonth() === currentMonth && transDate.getFullYear() === currentYear;
    });
    
    const income = monthlyTransactions
      .filter(trans => trans.type === 'income')
      .reduce((sum, trans) => sum + trans.amount, 0);
    
    const expense = monthlyTransactions
      .filter(trans => trans.type === 'expense')
      .reduce((sum, trans) => sum + trans.amount, 0);
    
    return { income, expense };
  };

  return (
    <DataContext.Provider value={{
      accounts,
      categories,
      wallets,
      transactions,
      addAccount,
      addCategory,
      addWallet,
      addTransaction,
      updateAccount,
      updateCategory,
      updateWallet,
      updateTransaction,
      deleteAccount,
      deleteCategory,
      deleteWallet,
      deleteTransaction,
      getTotalBalance,
      getAccountBalance,
      getMonthlyStats
    }}>
      {children}
    </DataContext.Provider>
  );
};