import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/formatters';
import { 
  DollarSign, 
  Calendar, 
  FileText, 
  CreditCard, 
  Tag, 
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
  Plus
} from 'lucide-react';

const TransactionForm: React.FC = () => {
  const { accounts, categories, wallets, addTransaction } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense' as 'expense' | 'income' | 'transfer',
    accountId: '',
    categoryId: '',
    walletId: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    transferToAccountId: ''
  });

  const userCurrency = user?.currency || 'USD';
  const filteredCategories = categories.filter(cat => cat.type === formData.type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.accountId) return;

    const transactionData = {
      amount: parseFloat(formData.amount),
      type: formData.type,
      accountId: formData.accountId,
      categoryId: formData.categoryId || undefined,
      walletId: formData.walletId || undefined,
      description: formData.description || undefined,
      date: formData.date,
      transferToAccountId: formData.type === 'transfer' ? formData.transferToAccountId : undefined
    };

    addTransaction(transactionData);
    navigate('/dashboard');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'income':
        return <ArrowUpRight className="w-5 h-5 text-emerald-600" />;
      case 'expense':
        return <ArrowDownRight className="w-5 h-5 text-red-600" />;
      case 'transfer':
        return <ArrowLeftRight className="w-5 h-5 text-blue-600" />;
      default:
        return <DollarSign className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add Transaction</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Record a new financial transaction
        </p>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Transaction Type
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'expense', label: 'Expense', color: 'red' },
                { value: 'income', label: 'Income', color: 'emerald' },
                { value: 'transfer', label: 'Transfer', color: 'blue' }
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: type.value as any, categoryId: '' }))}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center space-x-2 ${
                    formData.type === type.value
                      ? `border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-900/20`
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  {getTypeIcon(type.value)}
                  <span className={`font-medium ${
                    formData.type === type.value
                      ? `text-${type.color}-700 dark:text-${type.color}-300`
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                step="0.01"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                placeholder="0.00"
                required
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                {userCurrency}
              </span>
            </div>
          </div>

          {/* Account */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {formData.type === 'transfer' ? 'From Account' : 'Account'}
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.accountId}
                onChange={(e) => setFormData(prev => ({ ...prev, accountId: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="">Select an account</option>
                {accounts.map(account => (
                  <option key={account.id} value={account.id}>
                    {account.name} ({formatCurrency(account.balance, account.currency)})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Transfer To Account */}
          {formData.type === 'transfer' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To Account
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.transferToAccountId}
                  onChange={(e) => setFormData(prev => ({ ...prev, transferToAccountId: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required={formData.type === 'transfer'}
                >
                  <option value="">Select destination account</option>
                  {accounts.filter(acc => acc.id !== formData.accountId).map(account => (
                    <option key={account.id} value={account.id}>
                      {account.name} ({formatCurrency(account.balance, account.currency)})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Category */}
          {formData.type !== 'transfer' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select a category</option>
                  {filteredCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Wallet */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Wallet (Optional)
            </label>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.walletId}
                onChange={(e) => setFormData(prev => ({ ...prev, walletId: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">No wallet</option>
                {wallets.map(wallet => (
                  <option key={wallet.id} value={wallet.id}>
                    {wallet.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                placeholder="Enter transaction description..."
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 py-3 px-6 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all font-semibold flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Transaction</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;